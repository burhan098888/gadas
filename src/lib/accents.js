export const accentStyles = {
  indigo: {
    tile: 'bg-primary text-white',
    chip: 'bg-primary-soft text-primary',
    soft: 'bg-primary-soft',
    text: 'text-primary',
    icon: 'bg-primary-soft text-primary',
    bar: 'bg-primary',
  },
  violet: {
    tile: 'bg-violet text-white',
    chip: 'bg-violet-soft text-violet',
    soft: 'bg-violet-soft',
    text: 'text-violet',
    icon: 'bg-violet-soft text-violet',
    bar: 'bg-violet',
  },
  teal: {
    tile: 'bg-mint text-white',
    chip: 'bg-mint-soft text-mint',
    soft: 'bg-mint-soft',
    text: 'text-mint',
    icon: 'bg-mint-soft text-mint',
    bar: 'bg-mint',
  },
  amber: {
    tile: 'bg-sun text-ink',
    chip: 'bg-sun-soft text-[#8a5f00]',
    soft: 'bg-sun-soft',
    text: 'text-[#8a5f00]',
    icon: 'bg-sun-soft text-[#8a5f00]',
    bar: 'bg-sun',
  },
};

export function accentFor(name) {
  return accentStyles[name] ?? accentStyles.indigo;
}

export const topicToneStyles = {
  success: {
    bar: 'bg-mint',
    chip: 'bg-mint-soft text-mint',
  },
  accent: {
    bar: 'bg-sun',
    chip: 'bg-sun-soft text-[#8a5f00]',
  },
  violet: {
    bar: 'bg-violet',
    chip: 'bg-violet-soft text-violet',
  },
};