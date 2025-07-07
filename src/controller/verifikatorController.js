const User = require('../models/User');
const Izin = require('../models/Izin'); // anda buat sendiri nanti

/* GET daftar user dengan filter verifikasi */
exports.listUserRegistrations = async (req, res) => {
  const { verified } = req.query;          // true | false
  const users = await User.find({ role: 'user', isVerified: verified === 'true' }).select('-password');
  res.json(users);
};

/* PATCH /api/verifikator/users/:id/verify — set isVerified */
exports.verifyUser = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;             // true | false
  const user = await User.findByIdAndUpdate(id, { isVerified: status }, { new: true }).select('-password');
  res.json(user);
};

/* GET /api/verifikator/izin?status=submitted */
exports.listIzin = async (req, res) => {
  const { status } = req.query;            // submitted | revised | rejected | accepted
  const izins = await Izin.find(status ? { status } : {});
  res.json(izins);
};

/* PATCH /api/verifikator/izin/:id — ACC / Tolak / Revisi */
exports.processIzin = async (req, res) => {
  const { id } = req.params;
  const { status, komentar } = req.body;   // accepted | rejected | revised
  const izin = await Izin.findByIdAndUpdate(id, { status, komentar }, { new: true });
  res.json(izin);
};
