import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

const featureDetails = {
  // Educational Features
  "Personalized Learning": {
    description: "Adaptive learning paths tailored to your unique needs and learning style.",
    educationalValue: "Our AI assistants adapt to your learning style, pace, and preferences, creating a customized educational experience that evolves with your progress.",
    coreValue: "We believe that education should be personalized to each student's needs. Our adaptive learning technology ensures that every student can learn in the way that works best for them."
  },
  "Expert Knowledge": {
    description: "Access to deep subject expertise across multiple academic disciplines.",
    educationalValue: "Get instant access to expert-level knowledge and explanations in any subject area, helping you understand complex concepts and tackle challenging coursework with confidence.",
    coreValue: "Our commitment to academic excellence means providing students with accurate, up-to-date information and expert guidance across all subject areas."
  },
  "Interactive Learning": {
    description: "Engage in dynamic conversations and receive instant feedback on your work.",
    educationalValue: "Learn through active participation and receive immediate feedback on your work, helping you identify areas for improvement and reinforce your understanding.",
    coreValue: "We believe that learning should be engaging and interactive. Our technology creates an environment where students can actively participate in their education."
  },
  "Progress Tracking": {
    description: "Monitor your academic growth with detailed progress tracking and analytics.",
    educationalValue: "Stay motivated and focused by seeing your progress over time, identifying learning patterns, and adjusting your study strategies for optimal results.",
    coreValue: "We're committed to helping students understand their learning journey. Our progress tracking tools provide insights that empower students to take control of their education."
  },
  "24/7 Availability": {
    description: "Get help whenever you need it, day or night, without scheduling constraints.",
    educationalValue: "Never feel stuck on a problem or concept. Get immediate help when you need it most, maintaining your learning momentum and reducing study frustration.",
    coreValue: "Learning doesn't follow a fixed schedule. We provide round-the-clock support to ensure students can learn at their own pace and on their own schedule."
  },
  "Multi-subject Support": {
    description: "Comprehensive assistance across various subjects and academic levels.",
    educationalValue: "Whether you're working on math homework, writing an essay, or preparing for a science test, get expert help across all your subjects in one place.",
    coreValue: "Education is multifaceted, and we believe in providing comprehensive support across all subjects to help students succeed in their academic journey."
  },
  // Technical Features
  "Enhanced User Experience": {
    description: "Modern UI with real-time feedback, keyboard shortcuts, and intuitive navigation. Press '?' to view shortcuts.",
    educationalValue: "A seamless and intuitive interface helps you focus on learning rather than wrestling with technology.",
    coreValue: "We prioritize user experience to make learning technology accessible and enjoyable for everyone."
  },
  "Smart Form Validation": {
    description: "Real-time form validation with password strength indicators and helpful error messages.",
    educationalValue: "Clear feedback and guidance ensure you can easily manage your account and settings.",
    coreValue: "Security and usability go hand in hand in our platform design."
  },
  "Instant Feedback": {
    description: "Toast notifications and loading states keep you informed of all actions and processes.",
    educationalValue: "Stay informed about your actions and never feel lost in the learning process.",
    coreValue: "Transparency and clear communication are essential for a positive learning experience."
  },
  "Seamless Navigation": {
    description: "Breadcrumb navigation and keyboard shortcuts for quick access to any section.",
    educationalValue: "Efficiently move between different subjects and topics without losing your place.",
    coreValue: "Easy navigation helps students maintain focus and make the most of their study time."
  },
  "Responsive Design": {
    description: "Optimized for all devices with smooth animations and transitions.",
    educationalValue: "Learn on any device, anywhere, with the same high-quality experience.",
    coreValue: "Education should be accessible on any device, adapting to students' needs and preferences."
  },
  "Accessibility First": {
    description: "Built with ARIA support and keyboard navigation for all users.",
    educationalValue: "Ensure every student can access and use our platform effectively.",
    coreValue: "Inclusive design is fundamental to our mission of making education accessible to all."
  },
  // Community Features
  "Collaborative Learning": {
    description: "Join study groups, share resources, and learn together with peers from around the world.",
    educationalValue: "Learn from and with others, gaining different perspectives and approaches to problem-solving.",
    coreValue: "We believe in the power of community and peer learning to enhance education."
  },
  "Expert Community": {
    description: "Connect with teachers, tutors, and subject matter experts for guidance and mentorship.",
    educationalValue: "Access experienced mentors who can provide guidance and share their expertise.",
    coreValue: "Building connections between learners and experts creates a richer educational experience."
  },
  "Resource Sharing": {
    description: "Access and share study materials, notes, and educational resources with the community.",
    educationalValue: "Benefit from crowd-sourced knowledge and contribute to others' learning journeys.",
    coreValue: "Sharing knowledge and resources strengthens the entire learning community."
  },
  "24/7 Support": {
    description: "Get help anytime with our dedicated support team and community moderators.",
    educationalValue: "Never feel alone in your learning journey with constant community support.",
    coreValue: "A supportive community is essential for successful learning outcomes."
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
