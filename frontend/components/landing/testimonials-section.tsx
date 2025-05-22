import Image from "next/image";
import { StarIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Memora has transformed how we handle meetings. The transcriptions are incredibly accurate, and the summaries save me hours every week.",
    author: "Sarah Johnson",
    title: "Product Manager at TechCorp",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
  },
  {
    quote: "The search functionality is a game-changer. Being able to instantly find discussions from meetings that happened months ago is invaluable.",
    author: "Michael Chen",
    title: "Engineering Lead at InnovateX",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
  },
  {
    quote: "Our remote team relies on Memora daily. It ensures everyone stays aligned even when they can't attend every meeting.",
    author: "Jessica Williams",
    title: "Operations Director at RemoteFirst",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4,
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Loved by Teams Worldwide</h2>
          <p className="text-muted-foreground text-lg mx-auto max-w-3xl">
            See why organizations of all sizes trust Memora for their meeting needs.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"
                        }`}
                      />
                    ))}
                </div>
                <blockquote className="mb-6 text-lg">"{testimonial.quote}"</blockquote>
                <div className="flex items-center">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}