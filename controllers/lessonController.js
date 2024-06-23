exports.updateLessonCompletionStatus = async (req, res) => {
    try {
      const { userId, lessonId, isCompleted } = req.body;
  
      await pool.query(
        `UPDATE lessons
         SET isCompleted = $1
         WHERE id = $2 AND user_id = $3`,
        [isCompleted, lessonId, userId]
      );
  
      res.status(200).json({ message: "Lesson completion status updated." });
    } catch (error) {
      console.error("Error updating lesson completion status:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  