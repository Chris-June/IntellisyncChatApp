import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

const featureDetails = {
  "Personalized Learning": {
    description: "Our AI assistants adapt to your learning style, pace, and preferences, creating a customized educational experience that evolves with your progress.",
    educationalValue: "Every student learns differently. Our personalized approach ensures that you receive instruction tailored to your unique needs, helping you grasp concepts more effectively and maintain motivation.",
    coreValue: "We believe that education should be personalized to each student's needs. Our adaptive learning technology ensures that every student can learn in the way that works best for them."
  },
  "Expert Knowledge": {
    description: "Access comprehensive subject expertise across multiple disciplines, from mathematics and sciences to languages and humanities.",
    educationalValue: "Get instant access to expert-level knowledge and explanations in any subject area, helping you understand complex concepts and tackle challenging coursework with confidence.",
    coreValue: "Our commitment to academic excellence means providing students with accurate, up-to-date information and expert guidance across all subject areas."
  },
  "Interactive Learning": {
    description: "Engage in dynamic, two-way conversations that make learning active and engaging, with instant feedback and guided practice.",
    educationalValue: "Learn through active participation and receive immediate feedback on your work, helping you identify areas for improvement and reinforce your understanding.",
    coreValue: "We believe that learning should be engaging and interactive. Our technology creates an environment where students can actively participate in their education."
  },
  "Progress Tracking": {
    description: "Monitor your academic growth with detailed analytics and progress tracking, helping you understand your strengths and areas for improvement.",
    educationalValue: "Stay motivated and focused by seeing your progress over time, identifying learning patterns, and adjusting your study strategies for optimal results.",
    coreValue: "We're committed to helping students understand their learning journey. Our progress tracking tools provide insights that empower students to take control of their education."
  },
  "24/7 Availability": {
    description: "Access educational support whenever you need it, whether you're studying late at night or early in the morning.",
    educationalValue: "Never feel stuck on a problem or concept. Get immediate help when you need it most, maintaining your learning momentum and reducing study frustration.",
    coreValue: "Learning doesn't follow a fixed schedule. We provide round-the-clock support to ensure students can learn at their own pace and on their own schedule."
  },
  "Multi-subject Support": {
    description: "Access comprehensive assistance across various subjects and academic levels, from basic concepts to advanced topics.",
    educationalValue: "Whether you're working on math homework, writing an essay, or preparing for a science test, get expert help across all your subjects in one place.",
    coreValue: "Education is multifaceted, and we believe in providing comprehensive support across all subjects to help students succeed in their academic journey."
  }
};

const FeatureModal = ({ isOpen, onClose, feature }) => {
  const details = feature ? featureDetails[feature] : null;

  if (!details) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">{feature}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <p className="text-muted-foreground">{details.description}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Educational Value</h3>
            <p className="text-muted-foreground">{details.educationalValue}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Our Commitment</h3>
            <p className="text-muted-foreground">{details.coreValue}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureModal;
