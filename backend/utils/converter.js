/**
 * Date Conversion Utility
 * Converts between AD (Gregorian) and BS (Bikram Sambat) calendars
 * Uses sql.js SQLite database for accurate lookup-table based conversion
 */

const { queryAll, queryOne, run } = require('../db/database');

const BS_MONTH_NAMES_EN = [
  'Baisakh', 'Jestha', 'Ashadh', 'Shrawan',
  'Bhadra', 'Ashwin', 'Kartik', 'Mangsir',
  'Poush', 'Magh', 'Falgun', 'Chaitra'
];

const BS_MONTH_NAMES_NE = [
  'बैशाख', 'जेठ', 'असार', 'साउन',
  'भाद्र', 'आश्विन', 'कार्तिक', 'मंसिर',
  'पुष', 'माघ', 'फाल्गुन', 'चैत'
];

const AD_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_NAMES_NE = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'];

function adToBs(adYear, adMonth, adDay) {
  const adDate = new Date(adYear, adMonth - 1, adDay);

  if (isNaN(adDate.getTime())) {
    throw new Error('Invalid AD date provided');
  }

  const calendar = queryAll(
    'SELECT bs_year, bs_month, days, start_ad_year, start_ad_month, start_ad_day FROM bs_calendar ORDER BY bs_year, bs_month'
  );

  let bsYear = 0, bsMonth = 0, bsDay = 0;

  for (const row of calendar) {
    const startDate = new Date(row.start_ad_year, row.start_ad_month - 1, row.start_ad_day);
    const endDate = new Date(startDate.getTime() + row.days * 86400000);

    if (adDate >= startDate && adDate < endDate) {
      const diffDays = Math.floor((adDate - startDate) / 86400000);
      bsYear = row.bs_year;
      bsMonth = row.bs_month;
      bsDay = diffDays + 1;
      break;
    }
  }

  if (bsYear === 0) {
    throw new Error('Date out of supported range (BS 1970–2100 / AD 1913–2043)');
  }

  const dayOfWeek = adDate.getDay();

  return {
    bs: {
      year: bsYear,
      month: bsMonth,
      day: bsDay,
      monthNameEn: BS_MONTH_NAMES_EN[bsMonth - 1],
      monthNameNe: BS_MONTH_NAMES_NE[bsMonth - 1],
      dayNameEn: DAY_NAMES_EN[dayOfWeek],
      dayNameNe: DAY_NAMES_NE[dayOfWeek],
      formatted: `${bsYear}-${String(bsMonth).padStart(2,'0')}-${String(bsDay).padStart(2,'0')}`,
      formattedFull: `${BS_MONTH_NAMES_EN[bsMonth-1]} ${bsDay}, ${bsYear} BS`,
      formattedNe: `${bsYear} ${BS_MONTH_NAMES_NE[bsMonth - 1]} ${bsDay}`
    },
    ad: {
      year: adYear,
      month: adMonth,
      day: adDay,
      monthNameEn: AD_MONTH_NAMES[adMonth - 1],
      dayNameEn: DAY_NAMES_EN[dayOfWeek],
      dayNameNe: DAY_NAMES_NE[dayOfWeek],
      formatted: `${adYear}-${String(adMonth).padStart(2,'0')}-${String(adDay).padStart(2,'0')}`,
      formattedFull: `${AD_MONTH_NAMES[adMonth - 1]} ${adDay}, ${adYear} AD`
    }
  };
}

function bsToAd(bsYear, bsMonth, bsDay) {
  const row = queryOne(
    'SELECT * FROM bs_calendar WHERE bs_year = ? AND bs_month = ?',
    [bsYear, bsMonth]
  );

  if (!row) {
    throw new Error(`BS year ${bsYear} month ${bsMonth} not found. Supported range: 1970–2100 BS`);
  }

  if (bsDay < 1 || bsDay > row.days) {
    throw new Error(`Invalid day ${bsDay} for ${BS_MONTH_NAMES_EN[bsMonth-1]} ${bsYear} BS. Valid range: 1–${row.days}`);
  }

  const startDate = new Date(row.start_ad_year, row.start_ad_month - 1, row.start_ad_day);
  const adDate = new Date(startDate.getTime() + (bsDay - 1) * 86400000);

  const adYear = adDate.getFullYear();
  const adMonth = adDate.getMonth() + 1;
  const adDay = adDate.getDate();
  const dayOfWeek = adDate.getDay();

  return {
    ad: {
      year: adYear,
      month: adMonth,
      day: adDay,
      monthNameEn: AD_MONTH_NAMES[adMonth - 1],
      dayNameEn: DAY_NAMES_EN[dayOfWeek],
      dayNameNe: DAY_NAMES_NE[dayOfWeek],
      formatted: `${adYear}-${String(adMonth).padStart(2,'0')}-${String(adDay).padStart(2,'0')}`,
      formattedFull: `${AD_MONTH_NAMES[adMonth - 1]} ${adDay}, ${adYear} AD`
    },
    bs: {
      year: bsYear,
      month: bsMonth,
      day: bsDay,
      monthNameEn: BS_MONTH_NAMES_EN[bsMonth - 1],
      monthNameNe: BS_MONTH_NAMES_NE[bsMonth - 1],
      dayNameEn: DAY_NAMES_EN[dayOfWeek],
      dayNameNe: DAY_NAMES_NE[dayOfWeek],
      formatted: `${bsYear}-${String(bsMonth).padStart(2,'0')}-${String(bsDay).padStart(2,'0')}`,
      formattedFull: `${BS_MONTH_NAMES_EN[bsMonth-1]} ${bsDay}, ${bsYear} BS`,
      formattedNe: `${bsYear} ${BS_MONTH_NAMES_NE[bsMonth - 1]} ${bsDay}`
    }
  };
}

function getToday() {
  const today = new Date();
  return adToBs(today.getFullYear(), today.getMonth() + 1, today.getDate());
}

function getBsMonthCalendar(bsYear, bsMonth) {
  const row = queryOne(
    'SELECT * FROM bs_calendar WHERE bs_year = ? AND bs_month = ?',
    [bsYear, bsMonth]
  );

  if (!row) {
    throw new Error(`Calendar data not found for BS ${bsYear}-${bsMonth}`);
  }

  const startDate = new Date(row.start_ad_year, row.start_ad_month - 1, row.start_ad_day);
  const startDayOfWeek = startDate.getDay();

  const days = [];
  for (let d = 1; d <= row.days; d++) {
    const adDate = new Date(startDate.getTime() + (d - 1) * 86400000);
    days.push({
      bsDay: d,
      adYear: adDate.getFullYear(),
      adMonth: adDate.getMonth() + 1,
      adDay: adDate.getDate(),
      dayOfWeek: adDate.getDay(),
      isWeekend: adDate.getDay() === 6 // Saturday is holiday in Nepal
    });
  }

  return {
    bsYear,
    bsMonth,
    monthNameEn: BS_MONTH_NAMES_EN[bsMonth - 1],
    monthNameNe: BS_MONTH_NAMES_NE[bsMonth - 1],
    totalDays: row.days,
    startDayOfWeek,
    days
  };
}

module.exports = { adToBs, bsToAd, getToday, getBsMonthCalendar, BS_MONTH_NAMES_EN, BS_MONTH_NAMES_NE, AD_MONTH_NAMES };
