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
import { RouteIndex, RouteUserSignUp } from "@/helpers/RouteNames";
import { useFetch } from "@/hooks/useFetch";
import { setUserId } from "@/redux/cart.slice";

export function UserLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { data: campusData } = useFetch(
  //   `${getEnv("VITE_API_BASE_URL")}/campus/get-all`,
  //   {
  //     method: "get",
  //     credentials: "include",
  //   }
  // );

  const formSchema = z.object({
    // campus: z.string().min(3, {
    //   message: "campus name is required",
    // }),
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
      phone: "",
      campus: "",
    },
  });
  const onSubmit = async (values) => {
    try {
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/user/login`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        return showToast("error", data.message);
      }
      dispatch(setUser(data.user));
      dispatch(setUserId(data.user._id));
      showToast("success", data.message);
      navigate(RouteIndex);
    } catch (error) {
      return showToast("error", error.message);
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <div className="mb-2">
              <FormField
                control={form.control}
                name="campus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>campus</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select campus" />
                        </SelectTrigger>
                        <SelectContent>
                          {campusData?.campus?.length > 0 &&
                            campusData.campus.map((campus) => (
                              <SelectItem key={campus._id} value={campus._id}>
                                {campus.collegeName}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
            <div className="mt-5">
              <Button className={"w-full"} type="submit">
                Login
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-5 text-sm text-center">
          <p>
            Don't have an account?{" "}
            <Link
              className="text-amber-950 hover:underline"
              to={RouteUserSignUp}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
