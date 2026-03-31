// ============================================================
// controllers/adminController.js — Admin Dashboard Logic
// ONE JOB: Serve stats and data for the admin dashboard
// ============================================================

import Notice from "../models/notice.js";

// ─── Get Dashboard Stats ──────────────────────────────────────
export const getDashboardStats = async (req, res) => {
  try {
    // Total notices ever
    const totalNotices = await Notice.countDocuments();

    // Today's notices
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayNotices = await Notice.countDocuments({
      createdAt: { $gte: todayStart },
    });

    // This week
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    const weekNotices = await Notice.countDocuments({
      createdAt: { $gte: weekStart },
    });

    // Top companies complained against
    const topCompanies = await Notice.aggregate([
      { $group: { _id: "$oppositeParty", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // Top complaint types
    const topComplaintTypes = await Notice.aggregate([
      { $group: { _id: "$complaintType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // Language breakdown
    const languageBreakdown = await Notice.aggregate([
      { $group: { _id: "$language", count: { $sum: 1 } } },
    ]);

    // Recent 10 notices
    const recentNotices = await Notice.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("noticeId complainantName oppositeParty complaintType language createdAt status");

    res.json({
      success: true,
      stats: {
        totalNotices,
        todayNotices,
        weekNotices,
        topCompanies,
        topComplaintTypes,
        languageBreakdown,
        recentNotices,
      },
    });
  } catch (err) {
    console.error("Admin Stats Error:", err);
    res.status(500).json({ error: "Failed to fetch stats." });
  }
};

// ─── Get All Notices (paginated) ──────────────────────────────
export const getAllNotices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const notices = await Notice.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-generatedNotice"); // don't send full notice text in list

    const total = await Notice.countDocuments();

    res.json({
      success: true,
      notices,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notices." });
  }
};
