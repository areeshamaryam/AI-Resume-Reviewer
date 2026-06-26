const authMiddleware = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(401).json({
      message: "Not authorized.",
    });
  }
};

export default authMiddleware;
