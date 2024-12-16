import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";

const featureDetails = {
  "Personal Connection": {
    description: "Our AI assistants create a personalized experience by remembering your preferences, communication style, and business context across conversations.",
    businessValue: "As a business owner, having an assistant that understands your unique needs and preferences saves valuable time and reduces the need to repeatedly explain context, allowing you to focus on strategic decisions.",
    coreValue: "At Intellisync Solutions, we believe that technology should adapt to humans, not the other way around. By creating assistants that maintain personal connections, we're making AI more accessible and valuable for businesses of all sizes."
  },
  "Specialized Expertise": {
    description: "Each AI assistant is expertly trained in specific business domains, from financial analysis to human resources, providing deep insights and domain-specific guidance.",
    businessValue: "Access to specialized expertise typically requires significant investment in consultants or full-time experts. Our AI assistants provide this expertise on-demand, making high-level guidance accessible and affordable for SMEs.",
    coreValue: "We're committed to democratizing access to expert business knowledge, enabling SMEs to compete effectively with larger organizations by providing tools that level the playing field."
  },
  "Seamless Interaction": {
    description: "Our natural language processing ensures conversations feel natural and intuitive, with context-aware responses that maintain continuity across interactions.",
    businessValue: "Time is precious for business owners. Our seamless interaction model reduces the learning curve and makes getting valuable insights as simple as having a conversation with a trusted advisor.",
    coreValue: "We believe that powerful technology should be invisible. By creating natural interactions, we're making advanced AI capabilities accessible to everyone, regardless of technical expertise."
  },
  "Strategic Insights": {
    description: "Leverage advanced analytics and machine learning to transform your business data into actionable insights and strategic recommendations.",
    businessValue: "Make informed decisions with confidence by having access to data-driven insights that previously required expensive business intelligence tools and data analysts.",
    coreValue: "Our mission is to empower SMEs with the same level of strategic insight capabilities that larger enterprises enjoy, helping create a more competitive and dynamic business environment."
  },
  "Proactive Suggestions": {
    description: "Our AI assistants don't just respond to questions - they proactively identify opportunities, potential issues, and areas for improvement in your business.",
    businessValue: "Stay ahead of challenges and opportunities with an assistant that actively looks out for your business interests, helping you move from reactive to proactive management.",
    coreValue: "We believe in being more than just a tool - we aim to be a proactive partner in our clients' success, anticipating needs and providing solutions before problems arise."
  },
  "Enhanced Collaboration": {
    description: "Seamlessly integrate AI assistance into your team's workflow, improving communication, coordination, and productivity across your organization.",
    businessValue: "Improve team efficiency and effectiveness by having an AI assistant that can facilitate collaboration, manage communications, and ensure everyone stays aligned with business objectives.",
    coreValue: "We understand that business success is a team effort. Our commitment to enhancing collaboration reflects our belief in the power of combining human expertise with AI capabilities."
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
          <DialogDescription className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <p className="text-muted-foreground">{details.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Business Value</h3>
              <p className="text-muted-foreground">{details.businessValue}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Our Commitment</h3>
              <p className="text-muted-foreground">{details.coreValue}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureModal;
