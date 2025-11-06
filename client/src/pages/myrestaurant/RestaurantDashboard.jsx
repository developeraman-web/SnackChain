// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { getEnv } from "@/helpers/getEnv";
// import { showToast } from "@/helpers/showToast";
// import { useFetch } from "@/hooks/useFetch";
// import { zodResolver } from "@hookform/resolvers/zod";
// import React, { useEffect, useState } from "react";
// import Dropzone from "react-dropzone";
// import { Controller, useForm } from "react-hook-form";
// import { BiRupee } from "react-icons/bi";
// import { useSelector } from "react-redux";
// import z from "zod";
// const formSchema = z.object({
//   name: z.string().min(3, {
//     message: "campus name is required",
//   }),
//   price: z
//     .string()
//     .nonempty({ message: "Price is required" })
//     .transform((val) => Number(val))
//     .refine((val) => !isNaN(val), { message: "Price must be a number" })
//     .refine((val) => val > 0, { message: "Price must be positive" }),
//   category: z.string().min(3, {
//     message: "category required",
//   }),
//   tag: z.string({ message: "select a tag for your dish" }),
//   description: z.string({ message: "write a description" }),
// });

// export default function RestaurantDashboard() {
//   const restaurant = useSelector((state) => state.restaurant);
//   const [restaurantOpen, setRestaurantOpen] = useState(true);
//   const [filePreview, setFilePreview] = useState();
//   const [file, setFile] = useState();
//   const { data: restaurantData, loading } = useFetch(
//     `${getEnv("VITE_API_BASE_URL")}/business/get-restaurant/${
//       restaurant ? restaurant.restaurant._id : ""
//     }`,
//     {
//       method: "get",
//       credentials: "include",
//     },
//     []
//   );
//   const [refreshData, setRefreshData] = useState(false);
//   const { data: campusData, error } = useFetch(
//     `${getEnv("VITE_API_BASE_URL")}/campus/get-all`,
//     {
//       method: "get",
//       credentials: "include",
//     },
//     [refreshData]
//   );

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       restaurantName: "",
//       campus: "",
//       tag: "",
//       restaurantContact: "",
//       ownerName: "",
//       ownerEmail: "",
//       ownerContact: "",
//       isOpen: true,
//     },

//   });
//   const handleFile = (files) => {
//     const file = files[0];
//     const preview = URL.createObjectURL(file);
//     setFile(file);
//     setFilePreview(preview);
//   };

//   const onSubmit = async (values) => {
//     const formData = new FormData();
//     formData.append("restaurantName", values.restaurantName);
//     formData.append("campus", values.campus);
//     formData.append("restaurantContact", values.restaurantContact);
//     formData.append("slug", slugify(values.restaurantName));
//     formData.append("ownerName", values.ownerName);
//     formData.append("ownerEmail", values.ownerEmail);
//     formData.append("ownerContact", values.ownerContact);
//     formData.append("tag", values.tag);
//     formData.append("isOpen", restaurantOpen);
//     formData.append("file", file);

//     try {
//       const res = await fetch(
//         `${getEnv("VITE_API_BASE_URL")}/business/update`,
//         {
//           method: "POST",
//           credentials: "include",
//           body: formData,
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) {
//         showToast("error", data.message);
//         return;
//       }

//       showToast("success", data.message);
//     } catch (err) {
//       showToast("error", err.message);
//     }
//   };
//   useEffect(() => {
//     if (restaurantData) {
//       form.reset({
//         restaurantName: restaurantData?.restaurant?.name,
//         campus: restaurantData?.restaurant?.campus,
//         restaurantContact: restaurantData?.restaurant?.restaurantContact,
//         tag: restaurantData?.restaurant?.tag,
//         ownerName: restaurantData?.restaurant?.ownerName,
//         ownerEmail: restaurantData?.restaurant?.ownerEmail,
//         ownerContact: restaurantData?.restaurant?.ownerContact,
//       });
//       setFile(restaurantData?.restaurant?.restaurantFeatureImage);
//       setFilePreview(restaurantData?.restaurant?.restaurantFeatureImage);
//     }
//   }, [restaurantData]);
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <Card className="w-full p-8 shadow-lg shadow-amber-950">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
//             {/* -------------------- Restaurant Details -------------------- */}
//             <div>
//               <h2 className="text-xl font-semibold mb-4">
//                 🏬 Restaurant Details
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Restaurant Name */}
//                 <FormField
//                   control={form.control}
//                   name="restaurantName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Restaurant Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Enter restaurant name" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Campus */}
//                 <FormField
//                   control={form.control}
//                   name="campus"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Campus</FormLabel>
//                       <FormControl>
//                         <Select
//                           className={"w-full"}
//                           onValueChange={field.onChange}
//                           value={field.value}
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a campus" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {campusData?.campus?.map((campus) => (
//                               <SelectItem key={campus._id} value={campus._id}>
//                                 {campus.collegeName}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Restaurant Contact */}
//                 <Controller
//                   name="isVeg"
//                   control={control}
//                   render={({ field }) => (
//                     <div className="flex items-center gap-3">
//                       <Switch
//                         checked={field.value}
//                         onCheckedChange={field.onChange}
//                       />
//                       <span>{field.value ? "true" : "false"}</span>
//                     </div>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="restaurantContact"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Restaurant Contact</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Enter contact number" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Feature Image */}
//                 <div className="flex flex-col gap-3">
//                   <FormLabel>Feature Image</FormLabel>
//                   <Dropzone
//                     onDrop={(acceptedFiles) => handleFile(acceptedFiles)}
//                   >
//                     {({ getRootProps, getInputProps }) => (
//                       <div {...getRootProps()}>
//                         <input {...getInputProps()} />
//                         <div className="flex justify-center items-center w-36 h-28 border-2 border-dashed p-3 rounded-2xl cursor-pointer">
//                           <img src={filePreview} alt="" />
//                           {!file && (
//                             <p className="text-gray-400">Select an image</p>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </Dropzone>
//                 </div>
//               </div>
//             </div>
//             <FormField
//               control={form.control}
//               name="tag"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Tag</FormLabel>
//                   <FormControl>
//                     <Select
//                       className={"w-full"}
//                       onValueChange={field.onChange}
//                       value={field.value}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="veg or non-veg" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value={"veg"}>Veg</SelectItem>
//                         <SelectItem value={"non-veg"}>Non-Veg</SelectItem>
//                         <SelectItem value={"both"}>Both</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* -------------------- Owner Details -------------------- */}
//             <div>
//               <h2 className="text-xl font-semibold mb-4">👤 Owner Details</h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Owner Name */}
//                 <FormField
//                   control={form.control}
//                   name="ownerName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Owner Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Enter owner's name" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Owner Email */}
//                 <FormField
//                   control={form.control}
//                   name="ownerEmail"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Owner Email</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Enter email" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Owner Contact */}
//                 <FormField
//                   control={form.control}
//                   name="ownerContact"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Owner Contact</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Enter contact number" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="pt-6">
//               <Button type="submit" className="w-full bg-stone-700">
//                 Register Restaurant
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </Card>
//     </div>
//   );
// }

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useFetch } from "@/hooks/useFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import z from "zod";
import slugify from "slugify";

const formSchema = z.object({
  restaurantName: z.string().min(3, { message: "Restaurant name is required" }),
  campus: z.string().min(1, { message: "Campus is required" }),
  restaurantContact: z.string().min(3, { message: "Contact required" }),
  tag: z.string({ message: "Select a tag for your dish" }),
  ownerName: z.string().min(1, { message: "Owner name is required" }),
  ownerEmail: z.string().email({ message: "Valid email required" }),
  ownerContact: z.string().min(3, { message: "Owner contact required" }),
  isOpen: z.boolean(),
});

export default function RestaurantDashboard() {
  const restaurant = useSelector((state) => state.restaurant);
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
  const { data: restaurantData, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/business/get-restaurant/${
      restaurant?.restaurant?._id
    }`,
    { method: "get", credentials: "include" },
    []
  );
  const [refreshData, setRefreshData] = useState(false);
  const { data: campusData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/campus/get-all`,
    { method: "get", credentials: "include" },
    [refreshData]
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
      campus: "",
      tag: "",
      restaurantContact: "",
      ownerName: "",
      ownerEmail: "",
      ownerContact: "",
    },
  });

  const handleFile = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("restaurantName", values.restaurantName);
    formData.append("campus", values.campus);
    formData.append("restaurantContact", values.restaurantContact);
    formData.append("slug", slugify(values.restaurantName));
    formData.append("ownerName", values.ownerName);
    formData.append("ownerEmail", values.ownerEmail);
    formData.append("ownerContact", values.ownerContact);
    formData.append("tag", values.tag);
    formData.append("isOpen", values.isOpen);
    if (file) formData.append("file", file);

    try {
      const res = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/business/update`,
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
    } catch (err) {
      showToast("error", err.message);
    }
  };

  useEffect(() => {
    if (restaurantData) {
      form.reset({
        restaurantName: restaurantData?.restaurant?.name,
        campus: restaurantData?.restaurant?.campus,
        restaurantContact: restaurantData?.restaurant?.restaurantContact,
        tag: restaurantData?.restaurant?.tag,
        ownerName: restaurantData?.restaurant?.ownerName,
        ownerEmail: restaurantData?.restaurant?.ownerEmail,
        ownerContact: restaurantData?.restaurant?.ownerContact,
        isOpen: restaurantData?.restaurant?.isOpen ?? true,
      });
      setFile(restaurantData?.restaurant?.restaurantFeatureImage);
      setFilePreview(restaurantData?.restaurant?.restaurantFeatureImage);
    }
  }, [restaurantData, form]);

  if (loading) return <div>Loading...</div>;

  return (
    <Card className="w-full p-8 shadow-lg shadow-amber-950">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          {/* Restaurant Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              🏬 Restaurant Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Restaurant Name */}
              <FormField
                control={form.control}
                name="restaurantName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restaurant Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter restaurant name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campus */}
              <FormField
                control={form.control}
                name="campus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campus</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a campus" />
                        </SelectTrigger>
                        <SelectContent>
                          {campusData?.campus?.map((c) => (
                            <SelectItem key={c._id} value={c._id}>
                              {c.collegeName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* isVeg Switch */}
              <FormField
                control={form.control}
                name="isOpen"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormLabel>Restaurant Open</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        defaultChecked={restaurantData?.restaurant?.isOpen}
                      />
                    </FormControl>
                    <span>{field.value ? "Open" : "Closed"}</span>
                  </FormItem>
                )}
              />

              {/* Restaurant Contact */}
              <FormField
                control={form.control}
                name="restaurantContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restaurant Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contact number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Feature Image */}
              <div className="flex flex-col gap-3">
                <FormLabel>Feature Image</FormLabel>
                <Dropzone onDrop={handleFile}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="flex justify-center items-center w-36 h-28 border-2 border-dashed p-3 rounded-2xl cursor-pointer">
                        {filePreview ? (
                          <img
                            src={filePreview}
                            alt=""
                            className="object-cover w-full h-full rounded-lg"
                          />
                        ) : (
                          <p className="text-gray-400">Select an image</p>
                        )}
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
          </div>

          {/* Tag */}
          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="veg or non-veg" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="veg">Veg</SelectItem>
                      <SelectItem value="non-veg">Non-Veg</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Owner Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">👤 Owner Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter owner's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownerContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contact number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-stone-700">
            Save Details
          </Button>
        </form>
      </Form>
    </Card>
  );
}
