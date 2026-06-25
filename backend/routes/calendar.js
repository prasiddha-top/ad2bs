const express = require('express');
const router = express.Router();
const { getBsMonthCalendar, BS_MONTH_NAMES_EN, BS_MONTH_NAMES_NE } = require('../utils/converter');
const { getDB } = require('../db/database');

/**
 * GET /api/calendar/:year/:month
 * Returns full calendar data for a BS month
 */
router.get('/:year/:month', (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      return res.status(400).json({ error: 'Invalid year or month' });
    }

    const data = getBsMonthCalendar(year, month);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/calendar/years
 * Returns available BS year range
 */
router.get('/meta/years', (req, res) => {
  try {
    const db = getDB();
    const result = db.prepare(`
      SELECT MIN(bs_year) as minYear, MAX(bs_year) as maxYear FROM bs_calendar
    `).get();
    
    res.json({ 
      success: true, 
      data: { 
        minYear: result.minYear, 
        maxYear: result.maxYear,
        months: BS_MONTH_NAMES_EN.map((name, i) => ({ 
          num: i + 1, 
          nameEn: name, 
          nameNe: BS_MONTH_NAMES_NE[i] 
        }))
      } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/calendar/stats
 * Returns conversion statistics
 */
router.get('/meta/stats', (req, res) => {
  try {
    const db = getDB();
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as totalConversions,
        SUM(CASE WHEN direction='AD_TO_BS' THEN 1 ELSE 0 END) as adToBsCount,
        SUM(CASE WHEN direction='BS_TO_AD' THEN 1 ELSE 0 END) as bsToAdCount
      FROM conversion_log
    `).get();
    
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
