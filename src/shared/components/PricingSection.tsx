import { Check, Building2, BriefcaseBusiness, User2 } from 'lucide-react'

interface Plan {
  id: string
  title: string
  price: string
  billed: string
  features: string[]
  icon: 'personal' | 'business' | 'enterprise'
  featured?: boolean
}

const plans: Plan[] = [
  {
    id: 'personal',
    title: 'Personal Plan',
    price: '$49.90',
    billed: 'Billed Annually',
    features: [
      '25 Analytics Campaigns',
      'Includes Branded Reports',
      '300 Keywords for SEO',
      '24/7 Customer Support',
    ],
    icon: 'personal',
  },
  {
    id: 'enterprise',
    title: 'Enterprise Plan',
    price: '$149.90',
    billed: 'Billed Annually',
    features: [
      '25 Analytics Campaigns',
      'Includes Branded Reports',
      '300 Keywords for SEO',
      '15 Social Accounts',
      '24/7 Customer Support',
    ],
    icon: 'business',
    featured: true,
  },
  {
    id: 'business',
    title: 'Business Plan',
    price: '$89.90',
    billed: 'Billed Annually',
    features: [
      '25 Analytics Campaigns',
      'Includes Branded Reports',
      '300 Keywords for SEO',
      '24/7 Customer Support',
    ],
    icon: 'enterprise',
  },
]

function IconBadge({ type }: { type: Plan['icon'] }) {
  const Icon = type === 'personal' ? User2 : type === 'business' ? BriefcaseBusiness : Building2
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center"
      style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
      aria-hidden
    >
      <Icon size={24} />
    </div>
  )
}

function PlanCard({ plan }: { plan: Plan }) {
  const cardInner = (
    <div className="component rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-3">
        <IconBadge type={plan.icon} />
        <h4 className="text-lg font-semibold">{plan.title}</h4>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>{plan.price}</div>
        <div className="text-sm opacity-70 mt-1" style={{ color: 'var(--color-foreground)' }}>{plan.billed}</div>
      </div>
      <button className="button mt-5" style={{ background: 'var(--color-secondary)', color: 'var(--color-secondary-foreground)' }}>
        Get Started
      </button>
      <ul className="mt-5 space-y-2">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <Check size={16} style={{ color: 'var(--color-accent)' }} />
            <span className="opacity-80" style={{ color: 'var(--color-foreground)' }}>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  if (!plan.featured) return cardInner

  // Featured: subtle gradient ring using primary->accent and tinted surface
  return (
    <div className="rounded-2xl p-[1px]" style={{
      backgroundImage: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
    }}>
      <div
        className="rounded-2xl"
        style={{
          background: 'color-mix(in oklab, var(--color-background) 88%, var(--color-primary) 12%)',
          padding: '0.25rem',
        }}
      >
        {cardInner}
      </div>
    </div>
  )
}

export function PricingSection({ className = '' }: { className?: string }) {
  return (
    <section aria-labelledby="pricing" className={className}>
      <h3 id="pricing" className="text-lg font-semibold mb-4">Pricing</h3>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <PlanCard key={p.id} plan={p} />
        ))}
      </div>
    </section>
  )
}
