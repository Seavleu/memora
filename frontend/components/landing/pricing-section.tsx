import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    name: "Starter",
    price: "$9",
    description: "Perfect for individuals and small teams just getting started.",
    features: [
      "5 hours of audio transcription per month",
      "Basic meeting summaries",
      "7-day history",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "Great for growing teams with regular meetings.",
    features: [
      "25 hours of audio transcription per month",
      "Advanced AI summaries and insights",
      "Unlimited history",
      "Priority support",
      "Team collaboration features",
      "Advanced search capabilities",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with advanced security and compliance needs.",
    features: [
      "Unlimited audio transcription",
      "Custom AI model training",
      "SSO and advanced security",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section className="container py-20">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground text-lg mx-auto max-w-3xl">
          Choose the plan that's right for your team. All plans come with a 14-day free trial.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`flex flex-col ${
              plan.popular 
                ? "border-primary shadow-lg relative before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-primary before:pointer-events-none before:-m-[1px]" 
                : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 rounded-bl-lg rounded-tr-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && (
                  <span className="ml-1 text-muted-foreground">/month</span>
                )}
              </div>
              <CardDescription className="mt-4">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex">
                    <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className={`w-full ${plan.popular ? "" : "bg-primary/90 hover:bg-primary"}`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}