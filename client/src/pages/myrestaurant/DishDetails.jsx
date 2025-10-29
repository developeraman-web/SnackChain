import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Dropzone from "react-dropzone";
import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { BiRupee } from "react-icons/bi";
import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/helpers/showToast";
const formSchema = z.object({
  name: z.string().min(3, {
    message: "campus name is required",
  }),
  price: z
    .string()
    .nonempty({ message: "Price is required" })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Price must be a number" })
    .refine((val) => val > 0, { message: "Price must be positive" }),
  category: z.string().min(3, {
    message: "category required",
  }),
  tag: z.string({ message: "select a tag for your dish" }),
  description: z.string({ message: "write a description" }),
});
export function TagVegOfNonVeg({ tag }) {
  return (
    <div
      className={`w-6 h-6 border-2 p-0.5 flex items-center justify-center ${
        tag === "veg" ? "border-green-600" : "border-red-600"
      }`}
    >
      <div
        className={`w-3 h-3 rounded-[100%] ${
          tag === "veg" ? "bg-green-600" : "bg-red-600"
        }`}
      ></div>
    </div>
  );
}
export default function DishDetails() {
  const { id } = useParams();
  const restaurant = useSelector((state) => state.restaurant);
  const [refreshData, setRefreshData] = useState(false);
  const { data: dishData, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/menu/get-dish/${id ? id : ""}`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
  const [sumbitLoader, setSubmitLoader] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tag: "",
      category: "",
      description: "",
    },
  });
  const handleFile = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };

  const onSubmit = async (values) => {
    setSubmitLoader(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("tag", values.tag);
    formData.append("file", file);

    try {
      const res = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/menu/edit/${id ? id : ""}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) {
        showToast("error", data.message);
        return;
      }

      showToast("success", data.message);
      setRefreshData(!refreshData);
      setSubmitLoader(false);
      window.scrollTo(0, 0);
    } catch (err) {
      showToast("error", err.message);
    }
  };
  useEffect(() => {
    if (dishData && dishData.menu) {
      form.reset({
        name: dishData?.menu?.name,
        category: dishData?.menu?.category,
        price: String(dishData?.menu?.price),
        tag: dishData?.menu?.tag,
        description:
          dishData?.menu?.description === "undefined"
            ? "No Description Added"
            : dishData?.menu?.description,
      });
      setFile(dishData?.menu?.thumbImg);
      setFilePreview(dishData?.menu?.thumbImg);
    }
  }, [dishData]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-3">
        <div className="col-span-1">
          <img className="rounded-2xl" src={dishData?.menu?.thumbImg} alt="" />
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          <h3 className="md:text-2xl font-semibold text-lg flex items-center gap-1 ">
            <TagVegOfNonVeg tag={dishData?.menu?.tag} />
            {dishData?.menu?.name}
          </h3>
          <span className="flex items-center font-semibold">
            <FaIndianRupeeSign />
            {dishData?.menu?.price}
          </span>
          <p className="text-gray-500 font-semibold border-t border-b p-1">
            {dishData?.menu?.description}
          </p>
        </div>
      </div>
      <div className="py-2 mt-5">
        <h2 className="md:text-2xl rounded-2xl font-semibold text-lg flex justify-center items-center gap-1 border-b py-2 bg-amber-950/80 text-white">
          <MdOutlineModeEdit />
          Edit Your Dish
        </h2>
        <Card className="w-full p-8 shadow-xl mt-5 border-t shadow-amber-950">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter dish title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Pizza or Burger or Roll"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Restaurant Contact */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Price <BiRupee />
                        </FormLabel>

                        <FormControl>
                          <Input
                            min="0"
                            onWheel={(e) => e.target.blur()}
                            type={"number"}
                            placeholder="Enter Price"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tag</FormLabel>
                        <FormControl>
                          <Select
                            className={"w-full"}
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className={"w-full"}>
                              <SelectValue placeholder="veg or non-veg" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={"veg"}>Veg</SelectItem>
                              <SelectItem value={"non-veg"}>Non-Veg</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <FormLabel>Thumb Image</FormLabel>
                <Dropzone onDrop={(acceptedFiles) => handleFile(acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="flex justify-center items-center w-full h-64 border-2 border-dashed p-7 rounded-2xl cursor-pointer">
                        <img
                          className="w-full h-full"
                          src={filePreview}
                          alt="Select an image"
                        />
                        {!file && (
                          <p className="text-gray-400">Select an image</p>
                        )}
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className={"col-span-2"}>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Delicious and freshly prepared with handpicked ingredients."
                            className="w-full col-span-full border-2 min-h-20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button type="submit" className="w-full bg-stone-700">
                  {sumbitLoader ? "Editing..." : "Edit"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
