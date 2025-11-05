import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { updateLocation } from "@/redux/user.slice";
import { showToast } from "@/helpers/showToast";
import { IoLocationSharp } from "react-icons/io5";

export default function HeroSection() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const formSchema = z.object({
    campus: z.string(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campus: "",
    },
  });
  const { data: campusData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/campus/get-all`,

    {
      method: "get",
      credentials: "include",
    }
  );
  useEffect(() => {
    if (user && user.isLoggedIn) {
      form.setValue("campus", user.user.campus._id);
    }
  }, [campusData]);
  const onSubmit = async (values) => {
    if (user && !user.isLoggedIn) {
      return showToast("error", "Please Login");
    }
    try {
      const res = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/update/${
          user ? user?.user._id : ""
        }`,
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
      dispatch(updateLocation(data.campus));
      showToast("success", data.message);
    } catch (error) {
      return showToast("error", error.message);
    }
  };
  const imgUrl =
    "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="mb-3 h-[300px] flex justify-center items-center">
      <div
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute top-0 left-0 right-0 w-full h-[320px]"
      >
        <div className="absolute left-0 right-0 h-full bg-black/40 z-10"></div>
      </div>
      <div className="relative z-10 w-full flex justify-center items-center flex-col gap-y-4">
        <div className=" text-white md:text-3xl text-md font-bold p-1 flex items-center gap-1 animate-bounce">
          <IoLocationSharp />
          Choose Your Campus
        </div>
        <Form className={"z-10 relative"} {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" relative z-10 md:w-[450px] w-[200px] flex md:flex-row flex-col justify-center items-center gap-2"
          >
            <FormField
              control={form.control}
              name="campus"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValues={"a"}
                    >
                      <SelectTrigger className="min-w-[300px] p-2 font-semibold md:text-md text-sm bg-white">
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

            <div className="">
              <Button className={"cursor-pointer"} type="submit">
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
