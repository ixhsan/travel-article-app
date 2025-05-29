import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe2, MessageSquare, Smartphone } from "lucide-react";
import { Link } from "react-router";

export default function HomePage() {
  const features = [
    {
      icon: <Globe2 className="h-8 w-8 text-primary" />,
      title: "Curated Content",
      description:
        "Hand-picked travel stories and destinations from around the world.",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "Community Comments",
      description: "Engage with fellow travelers and share your experiences.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: "Mobile Friendly",
      description: "Access your favorite travel content on any device.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section
        className="relative flex min-h-[80vh] items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative z-10 text-center text-white">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            Discover Amazing Travel Destinations
          </h1>
          <p className="mb-8 text-lg text-gray-200 md:text-xl">
            Explore curated travel stories and share your own adventures with
            our community
          </p>
          <Link to="/articles">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90"
            >
              Explore Articles
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:py-24">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Why Choose TravelBlog?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 transition-colors hover:border-primary"
            >
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
