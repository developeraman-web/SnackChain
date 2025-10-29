import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import validator from "validator";
import { Button } from "@/components/ui/button";
import logo from "@/assets/images/logo.png";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { Link, useNavigate } from "react-router";
import {
  RouteIndex,
  RouteUserLogin,
  RouteUserSignUp,
} from "@/helpers/RouteNames";

export function UserSignup() {
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    email: z.email(),
    phone: z
      .string()
      .min(10, "invalid mobile")
      .refine((v) => validator.isMobilePhone(v, "any"), {
        message: "invalid mobile",
      }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  const onSubmit = async (values) => {
    try {
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/user/signup`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        return showToast("error", data.message);
      }
      showToast("success", data.message);
      navigate(RouteUserLogin);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <Card className={"w-[500px] p-5"}>
        <div className="mb-3 flex justify-center items-center">
          <Link to={RouteIndex}>
            <img height={150} width={150} src={logo} alt="" />
          </Link>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mb-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone No.</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Mobile" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5">
              <Button className={"w-full"} type="submit">
                Register
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-5 text-sm text-center">
          <p>
            Already have an account?{" "}
            <Link
              className="text-amber-950 hover:underline"
              to={RouteUserLogin}
            >
              Sign In
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
