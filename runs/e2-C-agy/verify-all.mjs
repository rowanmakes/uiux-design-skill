import { chromium } from 'playwright';
import path from 'path';

const htmlPath = path.resolve('runs/e2-C-agy/output/index.html');
const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = {};

  try {
    // 1. Desktop Interactive + Content + Constraint Verification
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
    page.on('pageerror', e => pageErrors.push(e.message));

    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    // Check verbatim copy & mandatory texts
    const bodyText = await page.evaluate(() => document.body.innerText);
    const verbatimBrandIntro = '半山烘焙是成都一家小型精品咖啡豆烘焙工作室，只做订阅制卖豆：每支豆子按小批量烘焙，标注烘焙日期与风味描述，按月寄送到家。工作室相信「豆子的产地和处理法自己会说话」，烘焙风格偏浅中烘，尽量保留产地本味。';
    const checks = {
      hasBrandName: bodyText.includes('半山烘焙'),
      hasVerbatimBrandIntro: bodyText.includes(verbatimBrandIntro),
      hasBean1: bodyText.includes('云雾水洗') && bodyText.includes('埃塞俄比亚 耶加雪菲') && bodyText.includes('水洗') && bodyText.includes('茉莉花香、柠檬酸质、红茶尾韵') && bodyText.includes('¥68 / 200g'),
      hasBean2: bodyText.includes('火塘日晒') && bodyText.includes('巴西 喜拉多') && bodyText.includes('日晒') && bodyText.includes('巧克力、烤坚果、低酸醇厚') && bodyText.includes('¥58 / 200g'),
      hasBean3: bodyText.includes('山脊蜜处理') && bodyText.includes('哥伦比亚 惠兰') && bodyText.includes('蜜处理') && bodyText.includes('红苹果、焦糖甜感、奶油口感') && bodyText.includes('¥72 / 200g'),
      hasSubMethod: bodyText.includes('按月寄送，每期 1 袋 200g'),
      hasSubPriceSingle: bodyText.includes('¥62 / 月起') && bodyText.includes('单袋订阅价'),
      hasSubPriceDouble: bodyText.includes('¥118 / 月') && bodyText.includes('双袋尝鲜组合'),
      hasSubCadence: bodyText.includes('每 2 周') && bodyText.includes('每月') && bodyText.includes('每 6 周'),
      zeroEnglishLeaks: !/[A-Za-z]{3,}/.test(bodyText)
    };

    // Check single disclosure in footer only
    const disclosureCheck = await page.evaluate(() => {
      const footerText = document.getElementById('site-footer')?.innerText || '';
      const hasFooterDisclosure = footerText.includes('设计演示样例') && footerText.includes('画面所用场景图片均为生成图');
      const allMatches = document.body.innerText.split('设计演示样例').length - 1;
      return { hasFooterDisclosure, disclosureOccurrences: allMatches };
    });

    // Check atmosphere animations & durations on normal motion
    const atmosphereSpecs = await page.evaluate(() => {
      const sun = getComputedStyle(document.querySelector('.sun-source-glow'));
      const mist1 = getComputedStyle(document.querySelector('.mist-band-1'));
      const mist2 = getComputedStyle(document.querySelector('.mist-band-2'));
      const mist3 = getComputedStyle(document.querySelector('.mist-band-3'));
      const grain = getComputedStyle(document.querySelector('.film-grain'));
      const dustCount = document.querySelectorAll('.mote').length;
      return {
        sunAnimationDuration: sun.animationDuration,
        mist1Duration: mist1.animationDuration,
        mist2Duration: mist2.animationDuration,
        mist3Duration: mist3.animationDuration,
        grainOpacity: parseFloat(grain.opacity),
        dustMoteCount: dustCount
      };
    });

    // Interactive checks:
    // A. Click Hero CTA -> scrolls toward Act I
    await page.click('#hero-cta-btn');
    await page.waitForTimeout(900);
    const scrollAfterHeroCta = await page.evaluate(() => window.scrollY);

    // B. Click Bean select button in Act II (`火塘日晒`)
    await page.evaluate(() => {
      document.querySelector('.js-select-bean[data-bean="火塘日晒"]').click();
    });
    await page.waitForTimeout(200);
    const afterSelectBean = await page.evaluate(() => ({
      feedbackText: document.getElementById('form-feedback')?.innerText,
      btnSelected: document.querySelector('.js-select-bean[data-bean="火塘日晒"]')?.classList.contains('is-selected')
    }));

    // C. Switch to dual-bag plan (`double`)
    await page.evaluate(() => {
      document.getElementById('plan-double').click();
    });
    await page.waitForTimeout(200);
    const afterSelectDualPlan = await page.evaluate(() => ({
      submitBtnText: document.getElementById('sub-submit-btn')?.innerText,
      feedbackText: document.getElementById('form-feedback')?.innerText
    }));

    // D. Switch cadence to `每 2 周`
    await page.evaluate(() => {
      document.querySelector('.cadence-btn[data-cadence="每 2 周"]').click();
    });
    await page.waitForTimeout(200);
    const afterSelectCadence = await page.evaluate(() => ({
      feedbackText: document.getElementById('form-feedback')?.innerText
    }));

    // E. Submit empty form -> inline Chinese validation message
    await page.evaluate(() => {
      document.getElementById('sub-submit-btn').click();
    });
    await page.waitForTimeout(200);
    const emptySubmitFeedback = await page.evaluate(() => ({
      feedbackText: document.getElementById('form-feedback')?.innerText,
      isError: document.getElementById('form-feedback')?.classList.contains('is-error'),
      slipVisible: document.getElementById('confirmed-slip')?.classList.contains('is-visible')
    }));

    // F. Submit valid contact -> confirmation slip visible
    await page.fill('#sub-contact', '13800138000');
    await page.evaluate(() => {
      document.getElementById('sub-submit-btn').click();
    });
    await page.waitForTimeout(200);
    const validSubmitFeedback = await page.evaluate(() => ({
      slipVisible: document.getElementById('confirmed-slip')?.classList.contains('is-visible'),
      slipDetails: document.getElementById('confirmed-detail')?.innerText
    }));

    // G. Click edit & undo buttons -> returns to form cleanly
    await page.evaluate(() => {
      document.getElementById('edit-sub-btn').click();
    });
    await page.waitForTimeout(200);
    const afterEditSlip = await page.evaluate(() => ({
      slipVisible: document.getElementById('confirmed-slip')?.classList.contains('is-visible'),
      formDisplay: getComputedStyle(document.getElementById('sub-form')).display,
      feedbackText: document.getElementById('form-feedback')?.innerText
    }));

    results.desktopInteractive = {
      checks,
      disclosureCheck,
      atmosphereSpecs,
      scrollAfterHeroCta,
      afterSelectBean,
      afterSelectDualPlan,
      afterSelectCadence,
      emptySubmitFeedback,
      validSubmitFeedback,
      afterEditSlip,
      consoleErrors,
      pageErrors
    };

    await ctx.close();

    // 2. Reduced Motion Programmatic Check (1440x900 & 390x844)
    for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
      const rmCtx = await browser.newContext({ viewport: vp, reducedMotion: 'reduce' });
      const rmPage = await rmCtx.newPage();
      await rmPage.goto(fileUrl, { waitUntil: 'networkidle' });
      await rmPage.waitForTimeout(300);

      const rmState = await rmPage.evaluate(() => {
        const sun = getComputedStyle(document.querySelector('.sun-source-glow'));
        const mist1 = getComputedStyle(document.querySelector('.mist-band-1'));
        const dust = getComputedStyle(document.querySelector('.dust-field'));
        const ed01 = getComputedStyle(document.getElementById('editorial-01'));
        const ed02 = getComputedStyle(document.getElementById('editorial-02'));
        const ed03 = getComputedStyle(document.getElementById('editorial-03'));
        return {
          sunAnimationName: sun.animationName,
          mist1AnimationName: mist1.animationName,
          dustDisplay: dust.display,
          ed01Opacity: ed01.opacity,
          ed02Opacity: ed02.opacity,
          ed03Opacity: ed03.opacity,
          horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
        };
      });

      results[`reducedMotion_${vp.width}x${vp.height}`] = rmState;
      await rmCtx.close();
    }
  } finally {
    await browser.close();
  }

  console.log(JSON.stringify(results, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
