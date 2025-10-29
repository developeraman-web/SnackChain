import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import validator from "validator";
import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getEnv } from "@/helpers/getEnv";
import { Link, useNavigate } from "react-router";
import { showToast } from "@/helpers/showToast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user.slice";
import {
  RouteIndex,
  RouteRestaurantDashboard,
  RouteUserSignUp,
} from "@/helpers/RouteNames";
import { useFetch } from "@/hooks/useFetch";
import { setRestaurant } from "@/redux/restaurant-slice";

export function OwnerCredentials() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSchema = z.object({
    email: z.email().min(10, "invalid mobile"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values) => {
    try {
      const res = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/business/verify-owner`,
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        return showToast("error", data.message);
      }
      dispatch(setRestaurant(data.restaurant));
      showToast("success", data.message);
      navigate(RouteRestaurantDashboard);
    } catch (error) {
      return showToast("error", error.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen w-full backdrop-blur-sm">
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-5">
              <Button className={"w-full"} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
