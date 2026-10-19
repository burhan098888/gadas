import { BookOpen, Brain, Calculator, FlaskConical } from 'lucide-react';

const icons = {
  Matematika: Calculator,
  'Bahasa Indonesia': BookOpen,
  IPA: FlaskConical,
  TPS: Brain,
};

export default function SubjectIcon({ subject, className = 'h-6 w-6' }) {
  const Icon = icons[subject] ?? BookOpen;
  return <Icon className={className} aria-hidden="true" />;
}