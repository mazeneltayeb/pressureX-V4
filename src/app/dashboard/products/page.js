

// "use client";



// import { createClient } from '@supabase/supabase-js';

// // في الداشبورد استخدم المفتاح العام فقط
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // المفتاح العام فقط
// );
// import { useState, useEffect } from "react";
// import {
//   Container,
//   Table,
//   Button,
//   Form,
//   Row,
//   Col,
//   Spinner,
//   Alert,
// } from "react-bootstrap";

// export default function DashboardProducts() {
//   const [products, setProducts] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);

//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("الكل");
//   const [formData, setFormData] = useState({
//     id: null,
//     name: "",
//     price: "",
//     description: "",
//     images: [],
//     video: "",
//     youtube: "",
//     article: "",
//     category: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [imageFiles, setImageFiles] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState("");

//   // 🟢 تحميل الفئات
//   const fetchCategories = async () => {
//     const res = await fetch("/api/categories");
//     const data = await res.json();
//     setCategories(data);
//   };

//   // 🟢 تحميل المنتجات
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/products");
//       if (!res.ok) throw new Error("فشل في تحميل المنتجات");
//       const data = await res.json();
//       setProducts(data);
//       setFilteredProducts(data);
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ حدث خطأ أثناء تحميل المنتجات");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   // 🟢 فلترة حسب الفئة
//   useEffect(() => {
//     if (selectedCategory === "الكل") {
//       setFilteredProducts(products);
//     } else {
//       setFilteredProducts(products.filter((p) => p.category === selectedCategory));
//     }
//   }, [selectedCategory, products]);

//   // 🟢 تحديث الفورم
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 🟢 رفع صور

// // 🟢 رفع صور متعددة - بدون مسح القديمة
// const handleImageUpload = async (e) => {
//   const files = Array.from(e.target.files);
  
//   if (files.length === 0) return;
  
//   // عمل معاينة للصور الجديدة فقط
//   const newPreviews = files.map((file) => URL.createObjectURL(file));
  
//   // 🔥 دمج الصور القديمة مع الجديدة في المعاينة
//   const allPreviews = [
//     ...imagePreviews,      // الصور القديمة في المعاينة
//     ...newPreviews         // الصور الجديدة
//   ];
  
//   // 🔥 دمج الملفات القديمة مع الجديدة
//   const allFiles = [
//     ...imageFiles,         // الملفات القديمة
//     ...files               // الملفات الجديدة
//   ];
  
//   setImagePreviews(allPreviews);
//   setImageFiles(allFiles);
  
//   console.log(`📸 تم إضافة ${files.length} صورة جديدة`);
//   console.log(`🖼️ إجمالي الصور: ${allPreviews.length} صورة`);
// };




// // const handleSubmit = async () => {
// //   if (!formData.name || !formData.price) {
// //     setMessage("⚠️ أدخل الاسم والسعر");
// //     return;
// //   }

// //   try {
// //     setLoading(true);

// //     let finalCategory = formData.category;

// //     // إضافة فئة جديدة
// //     if (!formData.category && newCategory.trim() !== "") {
// //       const res = await fetch("/api/categories", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ name: newCategory }),
// //       });
// //       const added = await res.json();
// //       finalCategory = added.name;
// //       await fetchCategories();
// //     }

// //     // 🔥 رفع الصور عبر API route
// //     let imageURLs = [];

// //     if (imageFiles.length > 0) {
// //       const formDataToSend = new FormData();
// //       imageFiles.forEach(file => {
// //         formDataToSend.append('images', file);
// //       });

// //       const uploadRes = await fetch("/api/upload", {
// //         method: "POST",
// //         body: formDataToSend,
// //       });

// //       if (!uploadRes.ok) throw new Error("فشل في رفع الصور");
      
// //       imageURLs = await uploadRes.json();
// //       console.log("✅ الروابط التي تم رفعها:", imageURLs);
// //     } else {
// //       // إذا مفيش صور جديدة، استخدم الصور القديمة
// //       imageURLs = formData.images || [];
// //     }

// //     const productData = {
// //       ...formData,
// //       price: Number(formData.price),
// //       category: finalCategory || "أخرى",
// //       images: imageURLs, // ⬅️ كل الصور بتكون في array
// //     };

// //     const res = await fetch("/api/products", {
// //       method: formData.id ? "PUT" : "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(productData),
// //     });

// //     if (!res.ok) throw new Error("فشل في الحفظ");

// //     setMessage(formData.id ? "✅ تم تعديل المنتج" : "✅ تم إضافة المنتج");
    
// //     // إعادة تعيين النموذج
// //     setFormData({
// //       id: null,
// //       name: "",
// //       price: "",
// //       description: "",
// //       images: [],
// //       video: "",
// //       youtube: "",
// //       article: "",
// //       category: "",
// //     });
// //     setImageFiles([]);
// //     setImagePreviews([]); // ⬅️ مسح المعاينات
// //     setNewCategory("");
// //     await fetchProducts();
// //   } catch (err) {
// //     console.error(err);
// //     setMessage("❌ حدث خطأ أثناء الحفظ");
// //   } finally {
// //     setLoading(false);
// //   }
// // };



// const handleSubmit = async () => {
//   if (!formData.name || !formData.price) {
//     setMessage("⚠️ أدخل الاسم والسعر");
//     return;
//   }

//   try {
//     setLoading(true);
//     setMessage(""); // مسح الرسائل القديمة

//     let finalCategory = formData.category;

//     // إضافة فئة جديدة
//     if (!formData.category && newCategory.trim() !== "") {
//       const res = await fetch("/api/categories", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: newCategory }),
//       });
      
//       if (!res.ok) throw new Error("فشل في إضافة الفئة");
      
//       const added = await res.json();
//       finalCategory = added.name;
//       await fetchCategories();
//       console.log("✅ تمت إضافة الفئة:", finalCategory);
//     }

//     // 🔥 رفع الصور عبر API route
//     let imageURLs = formData.images || []; // البدء بالصور القديمة

//     if (imageFiles.length > 0) {
//       console.log(`📤 جاري رفع ${imageFiles.length} صورة...`);
      
//       const formDataToSend = new FormData();
//       imageFiles.forEach((file, index) => {
//         formDataToSend.append('images', file);
//         console.log(`➕ أضيفت صورة ${index + 1}: ${file.name} (${(file.size / 1024).toFixed(2)}KB)`);
//       });

//       const uploadRes = await fetch("/api/upload", {
//         method: "POST",
//         body: formDataToSend, // لا تضيف headers هنا
//       });

//       console.log("📥 استجابة الرفع:", uploadRes.status);
      
//       if (!uploadRes.ok) {
//         const errorData = await uploadRes.json().catch(() => ({}));
//         throw new Error(`فشل في رفع الصور: ${errorData.message || uploadRes.status}`);
//       }
      
//       const uploadResult = await uploadRes.json();
//       console.log("✅ نتيجة الرفع:", uploadResult);
      
//       // ⚠️ هنا الخطأ: uploadResult مش array مباشر
//       // uploadResult بيكون فيه uploadedUrls property
//       if (uploadResult.success && uploadResult.uploadedUrls) {
//         // استخراج الـ URLs من الـ uploadedUrls array
//         const newImageUrls = uploadResult.uploadedUrls.map(item => 
//           typeof item === 'string' ? item : item.url
//         );
        
//         console.log("🖼️ روابط الصور الجديدة:", newImageUrls);
        
//         // دمج الصور القديمة مع الجديدة
//         imageURLs = [...imageURLs, ...newImageUrls];
        
//         // إذا كان فيه أخطاء في بعض الصور
//         if (uploadResult.errors && uploadResult.errors.length > 0) {
//           console.warn("⚠️ بعض الملفات لم ترفع:", uploadResult.errors);
//           setMessage(`✅ تم رفع ${newImageUrls.length} صورة، ولكن: ${uploadResult.errors.join(', ')}`);
//         }
//       } else {
//         console.warn("⚠️ لم يتم رفع أي صور:", uploadResult);
//       }
//     } else {
//       console.log("📷 لا توجد صور جديدة للرفع");
//     }

//     // التحقق من وجود صور على الأقل
//     if (imageURLs.length === 0) {
//       console.warn("⚠️ المنتج بدون صور!");
//     }

//     // إعداد بيانات المنتج النهائية
//     const productData = {
//       ...formData,
//       name: formData.name.trim(),
//       description: formData.description?.trim() || "",
//       price: Number(formData.price),
//       category: finalCategory || "أخرى",
//       images: imageURLs, // ⬅️ كل الصور (قديمة + جديدة)
//       video: formData.video?.trim() || "",
//       youtube: formData.youtube?.trim() || "",
//       article: formData.article?.trim() || "",
//       status: formData.status || "active",
//       stock: formData.stock ? Number(formData.stock) : 0,
//       createdAt: formData.id ? formData.createdAt : new Date().toISOString(),
//       updatedAt: new Date().toISOString()
//     };

//     console.log("📦 بيانات المنتج النهائية:", productData);

//     // تحديد نوع الطلب (تعديل أو إضافة)
//     const method = formData.id ? "PUT" : "POST";
//     const url = "/api/products" + (formData.id ? `?id=${formData.id}` : "");
    
//     console.log(`💾 جاري ${formData.id ? 'تعديل' : 'إضافة'} المنتج...`);
    
//     const res = await fetch(url, {
//       method: method,
//       headers: { 
//         "Content-Type": "application/json",
//         "Cache-Control": "no-cache"
//       },
//       body: JSON.stringify(productData),
//     });

//     if (!res.ok) {
//       const errorText = await res.text();
//       console.error("❌ خطأ في الحفظ:", errorText);
//       throw new Error(`فشل في الحفظ: ${res.status} - ${errorText}`);
//     }

//     const savedProduct = await res.json();
//     console.log("✅ تم حفظ المنتج:", savedProduct);
    
//     setMessage(formData.id ? "✅ تم تعديل المنتج بنجاح" : "✅ تم إضافة المنتج بنجاح");
    
//     // إعادة تعيين النموذج بعد تأكيد النجاح
//     setTimeout(() => {
//       setFormData({
//         id: null,
//         name: "",
//         price: "",
//         description: "",
//         images: [],
//         video: "",
//         youtube: "",
//         article: "",
//         category: "",
//         status: "active",
//         stock: 0
//       });
//       setImageFiles([]);
//       setImagePreviews([]); // مسح معاينات الصور
//       setNewCategory("");
//       setMessage(""); // مسح الرسالة بعد 3 ثواني
//     }, 3000);
    
//     // تحديث قائمة المنتجات
//     await fetchProducts();
    
//   } catch (err) {
//     console.error("💥 خطأ كامل:", err);
//     setMessage(`❌ ${err.message || "حدث خطأ أثناء الحفظ"}`);
//   } finally {
//     setLoading(false);
//   }
// };


//   const deleteProduct = async (id) => {
//     if (!confirm("هل أنت متأكد من الحذف؟")) return;
//     try {
//       setLoading(true);
//       const res = await fetch("/api/products", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });

//       if (!res.ok) throw new Error("فشل في الحذف");
//       setMessage("🗑️ تم حذف المنتج");
//       await fetchProducts();
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ حدث خطأ أثناء الحذف");
//     } finally {
//       setLoading(false);
//     }
//   };

  
// // 🟢 تعديل
// const editProduct = (p) => {
//   setFormData({
//     ...p,
//     category: p.category?.name || p.category || "",
//   });
//   setImagePreviews(p.images || []); // ⬅️ عرض الصور الحالية
//   window.scrollTo({ top: 0, behavior: "smooth" });
// };
//   return (
//     <Container className="py-5">
//       <h2 className="text-center mb-4">🛍️ لوحة إدارة المتجر</h2>

//       {message && <Alert variant="info">{message}</Alert>}

//       {/* نموذج الإضافة */}
//       <Form className="mb-4 p-3 border rounded bg-light shadow-sm">
//         <Row className="g-3">
//           <Col md={3}>
//             <Form.Control
//               placeholder="اسم المنتج"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </Col>

//           <Col md={2}>
//             <Form.Control
//               type="number"
//               placeholder="السعر"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//             />
//           </Col>

//           <Col md={3}>
//             <Form.Control
//               placeholder="الوصف القصير"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </Col>

//           <Col md={4}>
//             <Form.Control
//               as="textarea"
//               rows={2}
//               placeholder="المقال أو الوصف الطويل"
//               name="article"
//               value={formData.article}
//               onChange={handleChange}
//             />
//           </Col>

//           {/* 🚀 اختيار الفئة */}
//           <Col md={4}>
//             <Form.Select
//               name="category"
//               value={formData.category}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 if (value === "new") {
//                   setFormData({ ...formData, category: "" });
//                 } else {
//                   setFormData({ ...formData, category: value });
//                 }
//               }}
//             >
//               <option value="">اختر الفئة</option>

//               {categories.map((cat) => (
//                 <option key={cat.id} value={cat.name}>
//                   {cat.name}
//                 </option>
//               ))}

//               <option value="new">+ إضافة فئة جديدة</option>
//             </Form.Select>

//             {formData.category === "" && (
//               <Form.Control
//                 type="text"
//                 placeholder="اكتب فئة جديدة"
//                 className="mt-2"
//                 value={newCategory}
//                 onChange={(e) => setNewCategory(e.target.value)}
//               />
//             )}
//           </Col>

//           <Col md={4}>
//             <Form.Control
//               type="url"
//               placeholder="رابط يوتيوب"
//               name="youtube"
//               value={formData.youtube}
//               onChange={handleChange}
//             />
//           </Col>

// <Col md={4}>
//   <Form.Group>
//     <Form.Label>صور المنتج (يمكن رفع أكثر من صورة)</Form.Label>
//     <Form.Control
//       type="file"
//       accept="image/*"
//       multiple
//       onChange={handleImageUpload}
//       id="main-image-upload"

//     />
//     <Form.Text className="text-muted">
//       يمكنك رفع أكثر من صورة وسيتم عرضهم في معرض الصور
//     </Form.Text>
    
//     {/* معاينة الصور */}
  
//     {imagePreviews.length > 0 && (
//   <div className="mt-3">
//     <div className="d-flex justify-content-between align-items-center mb-2">
//       <h6 className="mb-0">معاينة الصور:</h6>
//       <Button
//         variant="outline-danger"
//         size="sm"
//         onClick={() => {
//           setImagePreviews([]);
//           setImageFiles([]);
//         }}
//       >
//         🗑️ مسح الكل
//       </Button>
//     </div>
    
//     <div className="d-flex flex-wrap gap-2">
//       {imagePreviews.map((preview, index) => (
//         <div key={index} className="position-relative">
//           <img 
//             src={preview} 
//             alt={`Preview ${index + 1}`}
//             style={{ 
//               width: "80px", 
//               height: "80px", 
//               objectFit: "cover", 
//               borderRadius: "8px",
//               border: "2px solid #ddd",
//               cursor: "pointer"
//             }}
//             onClick={() => {
//               // عند الضغط على الصورة، تعرض بحجم كبير
//               const newWindow = window.open();
//               newWindow.document.write(`
//                 <html>
//                   <head><title>معاينة الصورة ${index + 1}</title></head>
//                   <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#f8f9fa;">
//                     <img src="${preview}" style="max-width:90%; max-height:90%; border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,0.3);" />
//                     <button onclick="window.close()" style="position:fixed; top:20px; right:20px; background:red; color:white; border:none; border-radius:50%; width:40px; height:40px; font-size:20px; cursor:pointer;">×</button>
//                   </body>
//                 </html>
//               `);
//             }}
//           />
//           <span className="position-absolute top-0 start-0 bg-dark text-white rounded-circle px-2" style={{ fontSize: "0.7rem" }}>
//             {index + 1}
//           </span>
          
//           {/* زر حذف صورة فردية */}
//           <button
//             type="button"
//             className="btn btn-danger btn-sm position-absolute top-0 end-0"
//             style={{ 
//               transform: 'translate(30%, -30%)', 
//               width: "20px", 
//               height: "20px", 
//               fontSize: "0.6rem", 
//               padding: 0,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center"
//             }}
//             onClick={(e) => {
//               e.stopPropagation(); // منع فتح الصورة الكبيرة
              
//               // حذف الصورة من المعاينة والملفات
//               const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
//               const updatedFiles = imageFiles.filter((_, i) => i !== index);
              
//               setImagePreviews(updatedPreviews);
//               setImageFiles(updatedFiles);
              
//               console.log(`🗑️ تم حذف الصورة ${index + 1}`);
//             }}
//             title="حذف هذه الصورة"
//           >
//             ×
//           </button>
//         </div>
//       ))}
//     </div>
    
//     <div className="mt-2 d-flex justify-content-between align-items-center">
//       <p className="text-muted small mb-0">
//         {imagePreviews.length} صورة جاهزة للرفع
//       </p>
      
//       {/* زر تحميل المزيد */}
//       <div className="position-relative">
//         <Button
//           variant="outline-primary"
//           size="sm"
//           onClick={() => document.getElementById('image-upload').click()}
//         >
//           ➕ إضافة المزيد
//         </Button>
//         <Form.Control
//           id="image-upload"
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleImageUpload}
//           style={{ position: 'absolute', top: 0, left: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
//         />
//       </div>
//     </div>
//   </div>
// )}
//   </Form.Group>
// </Col>
//           <Col md={2}>
//             <Button
//               variant="success"
//               className="w-100 h-100"
//               onClick={handleSubmit}
//               disabled={loading}
//             >
//               {loading ? "جارٍ الحفظ..." : formData.id ? "💾 حفظ" : "➕ إضافة"}
//             </Button>
//           </Col>
//         </Row>
//       </Form>

//       {/* فلترة الفئات */}
//       <div className="mb-3 text-end">
//         <Form.Select
//           style={{ width: "200px", display: "inline-block" }}
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           <option value="الكل">الكل</option>

//           {categories.map((cat) => (
//             <option key={cat.id} value={cat.name}>
//               {cat.name}
//             </option>
//           ))}
//         </Form.Select>
//       </div>

//       {/* جدول المنتجات */}
//       {loading ? (
//         <div className="text-center py-5">
//           <Spinner animation="border" variant="success" />
//         </div>
//       ) : (
//         <Table striped bordered hover responsive className="shadow-sm">
//           <thead className="table-success text-center">
//             <tr>
//               <th>الصور</th>
//               <th>الاسم</th>
//               <th>السعر</th>
//               <th>الفئة</th>
//               <th>الوصف</th>
//               <th>إجراءات</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredProducts.map((p) => (
//               <tr key={p.id} className="align-middle text-center">
//                 {/* <td>
//                   <img
//                     src={p.images?.[0] || "https://via.placeholder.com/80"}
//                     alt={p.name}
//                     style={{ width: "80px", borderRadius: "10px" }}
//                   />
//                 </td> */}
//                 <td>
//   <div className="position-relative">
//     <img
//       src={p.images?.[0] || "https://via.placeholder.com/80"}
//       alt={p.name}
//       style={{ width: "80px", borderRadius: "10px" }}
//     />
//     {/* مؤشر عدد الصور */}
//     {p.images && p.images.length > 1 && (
//       <span className="position-absolute top-0 end-0 bg-primary text-white rounded-circle px-2" style={{ fontSize: "0.7rem", transform: 'translate(30%, -30%)' }}>
//         +{p.images.length - 1}
//       </span>
//     )}
//   </div>
// </td>
//                 <td>{p.name}</td>
//                 <td>{p.price} جنيه</td>
//                 <td>{p.category || "—"}</td>
//                 <td>{p.description}</td>
//                 <td>
//                   <Button
//                     variant="warning"
//                     size="sm"
//                     className="me-2"
//                     onClick={() => editProduct(p)}
//                   >
//                     ✏️ تعديل
//                   </Button>

//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => deleteProduct(p.id)}
//                   >
//                     🗑️ حذف
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </Container>
//   );
// }



// perfect////

// "use client";

// import { createClient } from '@supabase/supabase-js';
// import { useState, useEffect } from "react";
// import {
//   Container,
//   Table,
//   Button,
//   Form,
//   Row,
//   Col,
//   Spinner,
//   Alert,
// } from "react-bootstrap";

// // في الداشبورد استخدم المفتاح العام فقط
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// export default function DashboardProducts() {
//   const [products, setProducts] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("الكل");
//   const [formData, setFormData] = useState({
//     id: null,
//     name: "",
//     price: "",
//     number: "", // ⬅️ أضفنا حقل الرقم هنا
//     description: "",
//     images: [],
//     video: "",
//     youtube: "",
//     article: "",
//     category: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [imageFiles, setImageFiles] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState("");

//   // 🟢 تحميل الفئات
//   const fetchCategories = async () => {
//     const res = await fetch("/api/categories");
//     const data = await res.json();
//     setCategories(data);
//   };

//   // 🟢 تحميل المنتجات
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/products");
//       if (!res.ok) throw new Error("فشل في تحميل المنتجات");
//       const data = await res.json();
//       setProducts(data);
//       setFilteredProducts(data);
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ حدث خطأ أثناء تحميل المنتجات");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   // 🟢 فلترة حسب الفئة
//   useEffect(() => {
//     if (selectedCategory === "الكل") {
//       setFilteredProducts(products);
//     } else {
//       setFilteredProducts(products.filter((p) => p.category === selectedCategory));
//     }
//   }, [selectedCategory, products]);

//   // 🟢 تحديث الفورم
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 🟢 رفع صور متعددة
//   const handleImageUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;
    
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     const allPreviews = [...imagePreviews, ...newPreviews];
//     const allFiles = [...imageFiles, ...files];
    
//     setImagePreviews(allPreviews);
//     setImageFiles(allFiles);
//   };

//   // 🟢 حفظ المنتج
//   const handleSubmit = async () => {
//     if (!formData.name || !formData.price) {
//       setMessage("⚠️ أدخل الاسم والسعر");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMessage("");

//       let finalCategory = formData.category;

//       // إضافة فئة جديدة
//       if (!formData.category && newCategory.trim() !== "") {
//         const res = await fetch("/api/categories", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ name: newCategory }),
//         });
        
//         if (!res.ok) throw new Error("فشل في إضافة الفئة");
        
//         const added = await res.json();
//         finalCategory = added.name;
//         await fetchCategories();
//       }

//       // رفع الصور
//       let imageURLs = formData.images || [];

//       if (imageFiles.length > 0) {
//         const formDataToSend = new FormData();
//         imageFiles.forEach((file) => {
//           formDataToSend.append('images', file);
//         });

//         const uploadRes = await fetch("/api/upload", {
//           method: "POST",
//           body: formDataToSend,
//         });
        
//         if (!uploadRes.ok) {
//           const errorData = await uploadRes.json().catch(() => ({}));
//           throw new Error(`فشل في رفع الصور: ${errorData.message || uploadRes.status}`);
//         }
        
//         const uploadResult = await uploadRes.json();
        
//         if (uploadResult.success && uploadResult.uploadedUrls) {
//           const newImageUrls = uploadResult.uploadedUrls.map(item => 
//             typeof item === 'string' ? item : item.url
//           );
//           imageURLs = [...imageURLs, ...newImageUrls];
//         }
//       }

//       // إعداد بيانات المنتج النهائية مع الرقم
//       const productData = {
//         ...formData,
//         name: formData.name.trim(),
//         description: formData.description?.trim() || "",
//         price: Number(formData.price),
//         number: formData.number ? Number(formData.number) : null, // ⬅️ أضفنا الرقم هنا
//         category: finalCategory || "أخرى",
//         images: imageURLs,
//         video: formData.video?.trim() || "",
//         youtube: formData.youtube?.trim() || "",
//         article: formData.article?.trim() || "",
//         status: formData.status || "active",
//         stock: formData.stock ? Number(formData.stock) : 0,
//         createdAt: formData.id ? formData.createdAt : new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       };

//       // تحديد نوع الطلب
//       const method = formData.id ? "PUT" : "POST";
//       const url = "/api/products" + (formData.id ? `?id=${formData.id}` : "");
      
//       const res = await fetch(url, {
//         method: method,
//         headers: { 
//           "Content-Type": "application/json",
//           "Cache-Control": "no-cache"
//         },
//         body: JSON.stringify(productData),
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`فشل في الحفظ: ${res.status} - ${errorText}`);
//       }

//       const savedProduct = await res.json();
      
//       setMessage(formData.id ? "✅ تم تعديل المنتج بنجاح" : "✅ تم إضافة المنتج بنجاح");
      
//       // إعادة تعيين النموذج
//       setTimeout(() => {
//         setFormData({
//           id: null,
//           name: "",
//           price: "",
//           number: "", // ⬅️ إعادة تعيين الرقم
//           description: "",
//           images: [],
//           video: "",
//           youtube: "",
//           article: "",
//           category: "",
//           status: "active",
//           stock: 0
//         });
//         setImageFiles([]);
//         setImagePreviews([]);
//         setNewCategory("");
//         setMessage("");
//       }, 3000);
      
//       await fetchProducts();
      
//     } catch (err) {
//       console.error("💥 خطأ:", err);
//       setMessage(`❌ ${err.message || "حدث خطأ أثناء الحفظ"}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteProduct = async (id) => {
//     if (!confirm("هل أنت متأكد من الحذف؟")) return;
//     try {
//       setLoading(true);
//       const res = await fetch("/api/products", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });

//       if (!res.ok) throw new Error("فشل في الحذف");
//       setMessage("🗑️ تم حذف المنتج");
//       await fetchProducts();
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ حدث خطأ أثناء الحذف");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🟢 تعديل
//   const editProduct = (p) => {
//     setFormData({
//       ...p,
//       category: p.category?.name || p.category || "",
//       number: p.number || "", // ⬅️ عرض الرقم الحالي
//     });
//     setImagePreviews(p.images || []);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <Container className="py-5">
//       <h2 className="text-center mb-4">🛍️ لوحة إدارة المتجر</h2>

//       {message && <Alert variant="info">{message}</Alert>}

//       {/* نموذج الإضافة */}
//       <Form className="mb-4 p-3 border rounded bg-light shadow-sm">
//         <Row className="g-3">
//           <Col md={3}>
//             <Form.Control
//               placeholder="اسم المنتج"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </Col>

//           <Col md={2}>
//             <Form.Control
//               type="number"
//               placeholder="السعر"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//             />
//           </Col>

//           <Col md={2}>
//             <Form.Control
//               type="number"
//               placeholder="الرقم"
//               name="number"
//               value={formData.number}
//               onChange={handleChange}
//             />
//           </Col>

//           <Col md={3}>
//             <Form.Control
//               placeholder="الوصف القصير"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </Col>

//           <Col md={4}>
//             <Form.Control
//               as="textarea"
//               rows={2}
//               placeholder="المقال أو الوصف الطويل"
//               name="article"
//               value={formData.article}
//               onChange={handleChange}
//             />
//           </Col>

//           {/* اختيار الفئة */}
//           <Col md={4}>
//             <Form.Select
//               name="category"
//               value={formData.category}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 if (value === "new") {
//                   setFormData({ ...formData, category: "" });
//                 } else {
//                   setFormData({ ...formData, category: value });
//                 }
//               }}
//             >
//               <option value="">اختر الفئة</option>
//               {categories.map((cat) => (
//                 <option key={cat.id} value={cat.name}>
//                   {cat.name}
//                 </option>
//               ))}
//               <option value="new">+ إضافة فئة جديدة</option>
//             </Form.Select>

//             {formData.category === "" && (
//               <Form.Control
//                 type="text"
//                 placeholder="اكتب فئة جديدة"
//                 className="mt-2"
//                 value={newCategory}
//                 onChange={(e) => setNewCategory(e.target.value)}
//               />
//             )}
//           </Col>

//           <Col md={4}>
//             <Form.Control
//               type="url"
//               placeholder="رابط يوتيوب"
//               name="youtube"
//               value={formData.youtube}
//               onChange={handleChange}
//             />
//           </Col>

//           {/* رفع الصور */}
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>صور المنتج</Form.Label>
//               <Form.Control
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageUpload}
//                 id="main-image-upload"
//               />
//               <Form.Text className="text-muted">
//                 يمكنك رفع أكثر من صورة
//               </Form.Text>
              
//               {/* معاينة الصور */}
//               {imagePreviews.length > 0 && (
//                 <div className="mt-3">
//                   <div className="d-flex justify-content-between align-items-center mb-2">
//                     <h6 className="mb-0">معاينة الصور:</h6>
//                     <Button
//                       variant="outline-danger"
//                       size="sm"
//                       onClick={() => {
//                         setImagePreviews([]);
//                         setImageFiles([]);
//                       }}
//                     >
//                       🗑️ مسح الكل
//                     </Button>
//                   </div>
                  
//                   <div className="d-flex flex-wrap gap-2">
//                     {imagePreviews.map((preview, index) => (
//                       <div key={index} className="position-relative">
//                         <img 
//                           src={preview} 
//                           alt={`Preview ${index + 1}`}
//                           style={{ 
//                             width: "80px", 
//                             height: "80px", 
//                             objectFit: "cover", 
//                             borderRadius: "8px",
//                             border: "2px solid #ddd"
//                           }}
//                         />
//                         <span className="position-absolute top-0 start-0 bg-dark text-white rounded-circle px-2" style={{ fontSize: "0.7rem" }}>
//                           {index + 1}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </Form.Group>
//           </Col>

//           <Col md={2}>
//             <Button
//               variant="success"
//               className="w-100 h-100"
//               onClick={handleSubmit}
//               disabled={loading}
//             >
//               {loading ? "جارٍ الحفظ..." : formData.id ? "💾 حفظ" : "➕ إضافة"}
//             </Button>
//           </Col>
//         </Row>
//       </Form>

//       {/* فلترة الفئات */}
//       <div className="mb-3 text-end">
//         <Form.Select
//           style={{ width: "200px", display: "inline-block" }}
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           <option value="الكل">الكل</option>
//           {categories.map((cat) => (
//             <option key={cat.id} value={cat.name}>
//               {cat.name}
//             </option>
//           ))}
//         </Form.Select>
//       </div>

//       {/* جدول المنتجات */}
//       {loading ? (
//         <div className="text-center py-5">
//           <Spinner animation="border" variant="success" />
//         </div>
//       ) : (
//         <Table striped bordered hover responsive className="shadow-sm">
//           <thead className="table-success text-center">
//             <tr>
//               <th>الصور</th>
//               <th>الاسم</th>
//               <th>السعر</th>
//               <th>الرقم</th> {/* ⬅️ عمود جديد للرقم */}
//               <th>الفئة</th>
//               <th>الوصف</th>
//               <th>إجراءات</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredProducts.map((p) => (
//               <tr key={p.id} className="align-middle text-center">
//                 <td>
//                   <div className="position-relative">
//                     <img
//                       src={p.images?.[0] || "https://via.placeholder.com/80"}
//                       alt={p.name}
//                       style={{ width: "80px", borderRadius: "10px" }}
//                     />
//                     {p.images && p.images.length > 1 && (
//                       <span className="position-absolute top-0 end-0 bg-primary text-white rounded-circle px-2" style={{ fontSize: "0.7rem", transform: 'translate(30%, -30%)' }}>
//                         +{p.images.length - 1}
//                       </span>
//                     )}
//                   </div>
//                 </td>
//                 <td>{p.name}</td>
//                 <td>{p.price} جنيه</td>
//                 <td>{p.number || "—"}</td> {/* ⬅️ عرض الرقم */}
//                 <td>{p.category || "—"}</td>
//                 <td>{p.description}</td>
//                 <td>
//                   <Button
//                     variant="warning"
//                     size="sm"
//                     className="me-2"
//                     onClick={() => editProduct(p)}
//                   >
//                     ✏️ تعديل
//                   </Button>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => deleteProduct(p.id)}
//                   >
//                     🗑️ حذف
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </Container>
//   );
// }

////////////
// "use client";

// import { createClient } from '@supabase/supabase-js';
// import { useState, useEffect } from "react";
// import {
//   Container,
//   Table,
//   Button,
//   Form,
//   Row,
//   Col,
//   Spinner,
//   Alert,
//   ProgressBar,
//   Modal,
//   Badge
// } from "react-bootstrap";

// // في الداشبورد استخدم المفتاح العام فقط
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// export default function DashboardProducts() {
//   const [products, setProducts] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("الكل");
//   const [formData, setFormData] = useState({
//     id: null,
//     name: "",
//     price: "",
//     number: "",
//     description: "",
//     images: [],
//     video: "",
//     youtube: "",
//     article: "",
//     category: "",
//     status: "active",
//     stock: 0
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [imageFiles, setImageFiles] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState("");
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadStatus, setUploadStatus] = useState("");
//   const [showUploadModal, setShowUploadModal] = useState(false);

//   // 🟢 تحميل الفئات
//   const fetchCategories = async () => {
//     try {
//       const res = await fetch("/api/categories");
//       if (!res.ok) throw new Error("فشل في تحميل الفئات");
//       const data = await res.json();
//       setCategories(data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   // 🟢 تحميل المنتجات
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/products");
//       if (!res.ok) throw new Error("فشل في تحميل المنتجات");
//       const data = await res.json();
//       setProducts(data);
//       setFilteredProducts(data);
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ حدث خطأ أثناء تحميل المنتجات");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   // 🟢 فلترة حسب الفئة
//   useEffect(() => {
//     if (selectedCategory === "الكل") {
//       setFilteredProducts(products);
//     } else {
//       setFilteredProducts(products.filter((p) => p.category === selectedCategory));
//     }
//   }, [selectedCategory, products]);

//   // 🟢 تحديث الفورم
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 🟢 رفع صور متعددة - محسنة
//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
    
//     if (files.length === 0) return;
    
//     // 🔹 التحقق من أنواع الملفات المسموحة
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
    
//     if (invalidFiles.length > 0) {
//       setMessage(`⚠️ أنواع الملفات غير مدعومة: ${invalidFiles.map(f => f.name).join(', ')}`);
//       return;
//     }
    
//     // 🔹 التحقق من حجم الملفات (حد أقصى 10MB)
//     const maxSize = 10 * 1024 * 1024; // 10MB
//     const oversizedFiles = files.filter(file => file.size > maxSize);
    
//     if (oversizedFiles.length > 0) {
//       setMessage(`⚠️ الملفات التالية أكبر من 10MB: ${oversizedFiles.map(f => f.name).join(', ')}`);
//       return;
//     }
    
//     // 🔹 إضافة الملفات الجديدة
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     const allPreviews = [...imagePreviews, ...newPreviews];
//     const allFiles = [...imageFiles, ...files];
    
//     setImagePreviews(allPreviews);
//     setImageFiles(allFiles);
    
//     setMessage(`✅ تم إضافة ${files.length} صورة للرفع`);
//   };

//   // 🟢 دالة رفع الصور المحسنة
//   const uploadImages = async () => {
//     if (imageFiles.length === 0) return [];
    
//     setShowUploadModal(true);
//     setUploadStatus("جاري ضغط الصور...");
//     setUploadProgress(10);
    
//     try {
//       const formDataToSend = new FormData();
      
//       // إضافة جميع الملفات
//       imageFiles.forEach((file, index) => {
//         formDataToSend.append('images', file);
//       });
      
//       setUploadStatus("جاري رفع الصور إلى السيرفر...");
//       setUploadProgress(30);
      
//       // إضافة timestamp لمنع الكاش
//       const timestamp = Date.now();
//       const uploadRes = await fetch(`/api/upload?t=${timestamp}`, {
//         method: "POST",
//         body: formDataToSend,
//       });
      
//       if (!uploadRes.ok) {
//         const errorData = await uploadRes.json().catch(() => ({}));
//         throw new Error(errorData.error || "فشل في رفع الصور");
//       }
      
//       setUploadProgress(80);
      
//       const result = await uploadRes.json();
      
//       if (!result.success) {
//         throw new Error(result.message || "فشل في رفع الصور");
//       }
      
//       setUploadStatus("✅ تم رفع الصور بنجاح");
//       setUploadProgress(100);
      
//       // تأخير لإظهار حالة النجاح
//       setTimeout(() => {
//         setShowUploadModal(false);
//         setUploadProgress(0);
//       }, 1500);
      
//       return result.uploadedUrls || [];
      
//     } catch (error) {
//       console.error("❌ خطأ في رفع الصور:", error);
//       setUploadStatus(`❌ ${error.message}`);
//       setUploadProgress(0);
//       setTimeout(() => setShowUploadModal(false), 3000);
//       throw error;
//     }
//   };

//   // 🟢 حفظ المنتج - محسن
//   const handleSubmit = async () => {
//     if (!formData.name || !formData.price) {
//       setMessage("⚠️ أدخل الاسم والسعر");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMessage("");

//       let finalCategory = formData.category;

//       // إضافة فئة جديدة
//       if (!formData.category && newCategory.trim() !== "") {
//         const res = await fetch("/api/categories", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ name: newCategory }),
//         });
        
//         if (!res.ok) throw new Error("فشل في إضافة الفئة");
        
//         const added = await res.json();
//         finalCategory = added.name;
//         await fetchCategories();
//       }

//       let imageURLs = formData.images || [];

//       // 🔥 رفع الصور الجديدة إذا وجدت
//       if (imageFiles.length > 0) {
//         try {
//           const newImageUrls = await uploadImages();
//           imageURLs = [...imageURLs, ...newImageUrls];
//         } catch (uploadError) {
//           setMessage(`❌ ${uploadError.message}`);
//           setLoading(false);
//           return;
//         }
//       }

//       // إعداد بيانات المنتج
//       const productData = {
//         ...formData,
//         name: formData.name.trim(),
//         description: formData.description?.trim() || "",
//         price: Number(formData.price),
//         number: formData.number ? Number(formData.number) : null,
//         category: finalCategory || "أخرى",
//         images: imageURLs,
//         video: formData.video?.trim() || "",
//         youtube: formData.youtube?.trim() || "",
//         article: formData.article?.trim() || "",
//         status: formData.status || "active",
//         stock: formData.stock ? Number(formData.stock) : 0,
//         createdAt: formData.id ? formData.createdAt : new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       };

//       // تحديد نوع الطلب
//       const method = formData.id ? "PUT" : "POST";
//       const url = "/api/products" + (formData.id ? `?id=${formData.id}` : "");
      
//       const res = await fetch(url, {
//         method: method,
//         headers: { 
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(productData),
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`فشل في الحفظ: ${errorText}`);
//       }

//       const savedProduct = await res.json();
      
//       setMessage(formData.id ? "✅ تم تعديل المنتج بنجاح" : "✅ تم إضافة المنتج بنجاح");
      
//       // إعادة تعيين النموذج
//       setTimeout(() => {
//         setFormData({
//           id: null,
//           name: "",
//           price: "",
//           number: "",
//           description: "",
//           images: [],
//           video: "",
//           youtube: "",
//           article: "",
//           category: "",
//           status: "active",
//           stock: 0
//         });
//         setImageFiles([]);
//         setImagePreviews([]);
//         setNewCategory("");
//         setMessage("");
//       }, 3000);
      
//       // تحديث قائمة المنتجات
//       await fetchProducts();
      
//     } catch (err) {
//       console.error("💥 خطأ:", err);
//       setMessage(`❌ ${err.message || "حدث خطأ أثناء الحفظ"}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🟢 حذف صورة من المعاينة
//   const removeImage = (index) => {
//     const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
//     const updatedFiles = imageFiles.filter((_, i) => i !== index);
    
//     setImagePreviews(updatedPreviews);
//     setImageFiles(updatedFiles);
    
//     // تحرير الذاكرة
//     URL.revokeObjectURL(imagePreviews[index]);
//   };

//   // 🟢 حذف المنتج
//   const deleteProduct = async (id) => {
//     if (!confirm("هل أنت متأكد من الحذف؟ سيتم حذف المنتج بشكل نهائي.")) return;
    
//     try {
//       setLoading(true);
//       const res = await fetch("/api/products", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });

//       if (!res.ok) throw new Error("فشل في الحذف");
      
//       setMessage("🗑️ تم حذف المنتج بنجاح");
//       await fetchProducts();
      
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ حدث خطأ أثناء الحذف");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🟢 تعديل المنتج
//   const editProduct = (p) => {
//     setFormData({
//       ...p,
//       category: p.category?.name || p.category || "",
//       number: p.number || "",
//     });
//     setImagePreviews(p.images || []);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <Container className="py-5">
//       <h2 className="text-center mb-4">🛍️ لوحة إدارة المتجر</h2>

//       {message && (
//         <Alert 
//           variant={message.includes("✅") ? "success" : message.includes("⚠️") ? "warning" : "danger"} 
//           onClose={() => setMessage("")} 
//           dismissible
//         >
//           {message}
//         </Alert>
//       )}

//       {/* 🔹 مودال عرض حالة الرفع */}
//       <Modal show={showUploadModal} onHide={() => {}} centered backdrop="static">
//         <Modal.Header>
//           <Modal.Title>رفع الصور</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="text-center">
//             <Spinner animation="border" variant="primary" className="mb-3" />
//             <h5>{uploadStatus}</h5>
//             <ProgressBar 
//               now={uploadProgress} 
//               label={`${uploadProgress}%`}
//               animated 
//               striped 
//               variant="success"
//               className="mt-3"
//             />
//           </div>
//         </Modal.Body>
//       </Modal>

//       {/* 🔹 نموذج إضافة/تعديل المنتج */}
//       <div className="card shadow-lg border-0 mb-5">
//         <div className="card-header bg-primary text-white">
//           <h5 className="mb-0">
//             {formData.id ? "✏️ تعديل المنتج" : "➕ إضافة منتج جديد"}
//           </h5>
//         </div>
//         <div className="card-body">
//           <Form>
//             <Row className="g-3">
//               {/* اسم المنتج */}
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">اسم المنتج *</Form.Label>
//                   <Form.Control
//                     placeholder="أدخل اسم المنتج"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>

//               {/* السعر */}
//               <Col md={3}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">السعر (ج.م) *</Form.Label>
//                   <Form.Control
//                     type="number"
//                     placeholder="السعر"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleChange}
//                     min="0"
//                     step="0.01"
//                     required
//                   />
//                 </Form.Group>
//               </Col>

//               {/* الرقم */}
//               <Col md={3}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">الرقم</Form.Label>
//                   <Form.Control
//                     type="number"
//                     placeholder="الرقم"
//                     name="number"
//                     value={formData.number}
//                     onChange={handleChange}
//                     min="0"
//                   />
//                 </Form.Group>
//               </Col>

//               {/* الوصف القصير */}
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">الوصف القصير</Form.Label>
//                   <Form.Control
//                     placeholder="وصف مختصر للمنتج"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     as="textarea"
//                     rows={2}
//                   />
//                 </Form.Group>
//               </Col>

//               {/* الفئة */}
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">الفئة</Form.Label>
//                   <Form.Select
//                     name="category"
//                     value={formData.category}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (value === "new") {
//                         setFormData({ ...formData, category: "" });
//                       } else {
//                         setFormData({ ...formData, category: value });
//                       }
//                     }}
//                   >
//                     <option value="">اختر الفئة</option>
//                     {categories.map((cat) => (
//                       <option key={cat.id} value={cat.name}>
//                         {cat.name}
//                       </option>
//                     ))}
//                     <option value="new">+ إضافة فئة جديدة</option>
//                   </Form.Select>

//                   {formData.category === "" && (
//                     <Form.Control
//                       type="text"
//                       placeholder="اكتب اسم الفئة الجديدة"
//                       className="mt-2"
//                       value={newCategory}
//                       onChange={(e) => setNewCategory(e.target.value)}
//                     />
//                   )}
//                 </Form.Group>
//               </Col>

//               {/* رابط يوتيوب */}
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">رابط يوتيوب</Form.Label>
//                   <Form.Control
//                     type="url"
//                     placeholder="https://youtube.com/watch?v=..."
//                     name="youtube"
//                     value={formData.youtube}
//                     onChange={handleChange}
//                   />
//                   <Form.Text className="text-muted">
//                     رابط فيديو للمنتج (اختياري)
//                   </Form.Text>
//                 </Form.Group>
//               </Col>

//               {/* المخزون */}
//               <Col md={3}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">الكمية في المخزون</Form.Label>
//                   <Form.Control
//                     type="number"
//                     placeholder="الكمية"
//                     name="stock"
//                     value={formData.stock}
//                     onChange={handleChange}
//                     min="0"
//                   />
//                 </Form.Group>
//               </Col>

//               {/* الحالة */}
//               <Col md={3}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">الحالة</Form.Label>
//                   <Form.Select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                   >
//                     <option value="active">🟢 متاح</option>
//                     <option value="out_of_stock">🔴 غير متوفر</option>
//                     <option value="coming_soon">🟡 قريباً</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>

//               {/* وصف طويل/مقال */}
//               <Col md={12}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">الوصف التفصيلي</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={4}
//                     placeholder="وصف تفصيلي للمنتج، المميزات، المواصفات..."
//                     name="article"
//                     value={formData.article}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>

//               {/* 🔥 رفع الصور - محسن */}
//               <Col md={12}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">
//                     صور المنتج ({imageFiles.length} صورة جاهزة)
//                   </Form.Label>
                  
//                   <div className="border rounded p-3 bg-light">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       <div>
//                         <Form.Text className="text-muted">
//                           يمكنك رفع أكثر من صورة (JPEG, PNG, WebP) - الحد الأقصى 10MB لكل صورة
//                         </Form.Text>
//                       </div>
//                       <div>
//                         <Button
//                           variant="outline-primary"
//                           size="sm"
//                           onClick={() => document.getElementById('image-upload').click()}
//                         >
//                           📁 اختر صور
//                         </Button>
//                         {imageFiles.length > 0 && (
//                           <Button
//                             variant="outline-danger"
//                             size="sm"
//                             className="ms-2"
//                             onClick={() => {
//                               setImageFiles([]);
//                               setImagePreviews([]);
//                               imagePreviews.forEach(url => URL.revokeObjectURL(url));
//                             }}
//                           >
//                             🗑️ مسح الكل
//                           </Button>
//                         )}
//                       </div>
//                     </div>
                    
//                     <Form.Control
//                       id="image-upload"
//                       type="file"
//                       accept="image/jpeg, image/jpg, image/png, image/webp"
//                       multiple
//                       onChange={handleImageUpload}
//                       style={{ display: 'none' }}
//                     />
                    
//                     {/* معاينة الصور */}
//                     {imagePreviews.length > 0 && (
//                       <div className="mt-3">
//                         <h6 className="mb-2">معاينة الصور:</h6>
//                         <div className="row g-2">
//                           {imagePreviews.map((preview, index) => (
//                             <div key={index} className="col-6 col-md-3 col-lg-2">
//                               <div className="position-relative border rounded p-1 bg-white">
//                                 <img 
//                                   src={preview} 
//                                   alt={`Preview ${index + 1}`}
//                                   className="img-fluid rounded"
//                                   style={{ 
//                                     height: '100px',
//                                     width: '100%',
//                                     objectFit: 'cover'
//                                   }}
//                                 />
//                                 <Badge 
//                                   bg="secondary" 
//                                   className="position-absolute top-0 start-0 m-1"
//                                 >
//                                   {index + 1}
//                                 </Badge>
//                                 <Button
//                                   variant="danger"
//                                   size="sm"
//                                   className="position-absolute top-0 end-0 m-1 p-0"
//                                   style={{ width: '24px', height: '24px' }}
//                                   onClick={() => removeImage(index)}
//                                 >
//                                   ×
//                                 </Button>
//                                 <div className="text-center small mt-1">
//                                   {imageFiles[index]?.name?.slice(0, 15)}...
//                                   <br />
//                                   <small className="text-muted">
//                                     {(imageFiles[index]?.size / 1024 / 1024).toFixed(2)} MB
//                                   </small>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </Form.Group>
//               </Col>

//               {/* 🔥 زر الحفظ */}
//               <Col md={12}>
//                 <div className="d-flex justify-content-end gap-2 mt-3">
//                   {formData.id && (
//                     <Button
//                       variant="outline-secondary"
//                       onClick={() => {
//                         setFormData({
//                           id: null,
//                           name: "",
//                           price: "",
//                           number: "",
//                           description: "",
//                           images: [],
//                           video: "",
//                           youtube: "",
//                           article: "",
//                           category: "",
//                           status: "active",
//                           stock: 0
//                         });
//                         setImageFiles([]);
//                         setImagePreviews([]);
//                       }}
//                     >
//                       إلغاء التعديل
//                     </Button>
//                   )}
//                   <Button
//                     variant={formData.id ? "warning" : "success"}
//                     size="lg"
//                     onClick={handleSubmit}
//                     disabled={loading}
//                     className="px-4"
//                   >
//                     {loading ? (
//                       <>
//                         <Spinner animation="border" size="sm" className="me-2" />
//                         جاري الحفظ...
//                       </>
//                     ) : formData.id ? (
//                       "💾 حفظ التعديلات"
//                     ) : (
//                       "➕ إضافة المنتج"
//                     )}
//                   </Button>
//                 </div>
//               </Col>
//             </Row>
//           </Form>
//         </div>
//       </div>

//       {/* 🔹 فلترة المنتجات */}
//       <div className="card shadow-sm border-0 mb-4">
//         <div className="card-body">
//           <div className="row align-items-center">
//             <div className="col-md-4 mb-2">
//               <Form.Select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//               >
//                 <option value="الكل">📂 جميع المنتجات</option>
//                 {categories.map((cat) => (
//                   <option key={cat.id} value={cat.name}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </div>
//             <div className="col-md-8 text-md-end">
//               <Badge bg="info" className="fs-6 p-2">
//                 عدد المنتجات: {filteredProducts.length}
//               </Badge>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 🔹 جدول المنتجات */}
//       <div className="card shadow-lg border-0">
//         <div className="card-header bg-dark text-white">
//           <h5 className="mb-0">📋 قائمة المنتجات</h5>
//         </div>
//         <div className="card-body p-0">
//           {loading ? (
//             <div className="text-center py-5">
//               <Spinner animation="border" variant="primary" />
//               <p className="mt-3">جارٍ تحميل المنتجات...</p>
//             </div>
//           ) : (
//             <div className="table-responsive">
//               <Table hover className="mb-0">
//                 <thead className="table-dark">
//                   <tr>
//                     <th width="100">الصور</th>
//                     <th>الاسم</th>
//                     <th width="120">السعر</th>
//                     <th width="100">الرقم</th>
//                     <th width="150">الفئة</th>
//                     <th width="120">المخزون</th>
//                     <th width="150">الحالة</th>
//                     <th width="180" className="text-center">الإجراءات</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredProducts.length > 0 ? (
//                     filteredProducts.map((product) => (
//                       <tr key={product.id}>
//                         <td>
//                           <div className="position-relative">
//                             <img
//                               src={product.images?.[0] || "https://via.placeholder.com/80"}
//                               alt={product.name}
//                               className="rounded border"
//                               style={{ 
//                                 width: "80px", 
//                                 height: "80px", 
//                                 objectFit: "cover" 
//                               }}
//                             />
//                             {product.images && product.images.length > 1 && (
//                               <Badge 
//                                 bg="primary" 
//                                 className="position-absolute top-0 end-0 translate-middle"
//                               >
//                                 +{product.images.length - 1}
//                               </Badge>
//                             )}
//                           </div>
//                         </td>
//                         <td>
//                           <div>
//                             <strong>{product.name}</strong>
//                             {product.description && (
//                               <p className="text-muted small mb-0 mt-1">
//                                 {product.description.slice(0, 60)}...
//                               </p>
//                             )}
//                           </div>
//                         </td>
//                         <td>
//                           <span className="fw-bold text-success">
//                             {product.price} ج.م
//                           </span>
//                         </td>
//                         <td>
//                           {product.number ? (
//                             <Badge bg="secondary" className="fs-6">
//                               #{product.number}
//                             </Badge>
//                           ) : (
//                             <span className="text-muted">—</span>
//                           )}
//                         </td>
//                         <td>
//                           <Badge bg="outline-primary" className="border text-dark">
//                             {product.category || "—"}
//                           </Badge>
//                         </td>
//                         <td>
//                           <div className="d-flex align-items-center">
//                             <div className={`px-2 py-1 rounded ${product.stock > 10 ? 'bg-success text-white' : product.stock > 0 ? 'bg-warning text-dark' : 'bg-danger text-white'}`}>
//                               {product.stock || 0}
//                             </div>
//                           </div>
//                         </td>
//                         <td>
//                           {product.status === 'active' && (
//                             <Badge bg="success">🟢 متاح</Badge>
//                           )}
//                           {product.status === 'out_of_stock' && (
//                             <Badge bg="danger">🔴 غير متوفر</Badge>
//                           )}
//                           {product.status === 'coming_soon' && (
//                             <Badge bg="warning" text="dark">🟡 قريباً</Badge>
//                           )}
//                         </td>
//                         <td className="text-center">
//                           <div className="btn-group" role="group">
//                             <Button
//                               variant="outline-warning"
//                               size="sm"
//                               onClick={() => editProduct(product)}
//                               title="تعديل"
//                             >
//                               ✏️
//                             </Button>
//                             <Button
//                               variant="outline-info"
//                               size="sm"
//                               href={`/store/${product.id}`}
//                               target="_blank"
//                               title="عرض"
//                             >
//                               👁️
//                             </Button>
//                             <Button
//                               variant="outline-danger"
//                               size="sm"
//                               onClick={() => deleteProduct(product.id)}
//                               title="حذف"
//                             >
//                               🗑️
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="8" className="text-center py-4">
//                         <Alert variant="info">
//                           <h5>📭 لا توجد منتجات</h5>
//                           <p>لم يتم إضافة أي منتجات بعد</p>
//                           <Button 
//                             variant="primary" 
//                             onClick={() => setSelectedCategory("الكل")}
//                           >
//                             عرض جميع المنتجات
//                           </Button>
//                         </Alert>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* 🔹 معلومات إضافية */}
//       <div className="mt-4 text-center text-muted">
//         <small>
//           ⚡ نظام متقدم لإدارة المنتجات | 📊 {products.length} منتج إجمالاً | 
//           🖼️ يدعم رفع وتنظيم الصور
//         </small>
//       </div>
//     </Container>
//   );
// }

// "use client";

// import { createClient } from '@supabase/supabase-js';
// import { useState, useEffect } from "react";
// import {
//   Container,
//   Table,
//   Button,
//   Form,
//   Row,
//   Col,
//   Spinner,
//   Alert,
//   Modal,
//   ProgressBar,
//   Badge
// } from "react-bootstrap";

// // في الداشبورد استخدم المفتاح العام فقط
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// export default function DashboardProducts() {
//   const [products, setProducts] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("الكل");
//   const [formData, setFormData] = useState({
//     id: null,
//     name: "",
//     price: "",
//     number: "",
//     description: "",
//     images: [], // ⬅️ array فارغة
//     video: "",
//     youtube: "",
//     article: "",
//     category: "",
//     status: "active",
//     stock: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [imageFiles, setImageFiles] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState("");
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadStatus, setUploadStatus] = useState("");
//   const [showUploadModal, setShowUploadModal] = useState(false);

//   // 🟢 تحميل الفئات
//   const fetchCategories = async () => {
//     const res = await fetch("/api/categories");
//     const data = await res.json();
//     setCategories(data);
//   };

//   // 🟢 تحميل المنتجات
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/products");
//       if (!res.ok) throw new Error("فشل في تحميل المنتجات");
//       const data = await res.json();
//       setProducts(data);
//       setFilteredProducts(data);
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ حدث خطأ أثناء تحميل المنتجات");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   // 🟢 فلترة حسب الفئة
//   useEffect(() => {
//     if (selectedCategory === "الكل") {
//       setFilteredProducts(products);
//     } else {
//       setFilteredProducts(products.filter((p) => p.category === selectedCategory));
//     }
//   }, [selectedCategory, products]);

//   // 🟢 تحديث الفورم
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 🟢 رفع صور متعددة
//   const handleImageUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;
    
//     // 🔹 التحقق من أنواع الملفات المسموحة
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
    
//     if (invalidFiles.length > 0) {
//       setMessage(`⚠️ أنواع الملفات غير مدعومة: ${invalidFiles.map(f => f.name).join(', ')}`);
//       return;
//     }
    
//     // 🔹 التحقق من حجم الملفات
//     const maxSize = 10 * 1024 * 1024; // 10MB
//     const oversizedFiles = files.filter(file => file.size > maxSize);
    
//     if (oversizedFiles.length > 0) {
//       setMessage(`⚠️ الملفات التالية أكبر من 10MB: ${oversizedFiles.map(f => f.name).join(', ')}`);
//       return;
//     }
    
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     const allPreviews = [...imagePreviews, ...newPreviews];
//     const allFiles = [...imageFiles, ...files];
    
//     setImagePreviews(allPreviews);
//     setImageFiles(allFiles);
    
//     setMessage(`✅ تم إضافة ${files.length} صورة للرفع`);
//   };

//   // 🔥 دالة رفع الصور - تستقبل array of strings فقط
//   const uploadImages = async () => {
//     if (imageFiles.length === 0) return [];
    
//     setShowUploadModal(true);
//     setUploadStatus("جاري ضغط الصور...");
//     setUploadProgress(10);
    
//     try {
//       const formDataToSend = new FormData();
      
//       // إضافة جميع الملفات
//       imageFiles.forEach((file) => {
//         formDataToSend.append('images', file);
//       });
      
//       setUploadStatus("جاري رفع الصور إلى السيرفر...");
//       setUploadProgress(30);
      
//       const uploadRes = await fetch("/api/upload", {
//         method: "POST",
//         body: formDataToSend,
//       });
      
//       if (!uploadRes.ok) {
//         throw new Error(`خطأ في السيرفر: ${uploadRes.status}`);
//       }
      
//       const result = await uploadRes.json();
//       console.log("📥 استجابة الرفع:", result);
      
//       // 🔹 **المهم: استخراج الـ URLs فقط (array of strings)**
//       let uploadedUrls = [];
      
//       if (result && result.uploadedUrls && Array.isArray(result.uploadedUrls)) {
//         uploadedUrls = result.uploadedUrls.map(item => {
//           // إذا كان الـ API رجع strings مباشرة
//           if (typeof item === 'string') {
//             return item;
//           }
//           // إذا كان object، استخرج الـ url منه
//           else if (item && typeof item === 'object') {
//             // حاول استخراج الـ URL من الـ object
//             const url = item.url || item.publicUrl || item.link;
//             if (url && url.startsWith('http')) {
//               return url; // ⬅️ رجع string فقط
//             }
//           }
//           return null;
//         }).filter(url => url !== null); // إزالة القيم null
//       }
      
//       console.log("🔗 الـ URLs المستخرجة (strings only):", uploadedUrls);
      
//       setUploadProgress(80);
//       setUploadStatus(`تم رفع ${uploadedUrls.length} صورة بنجاح`);
//       setUploadProgress(100);
      
//       setTimeout(() => {
//         setShowUploadModal(false);
//         setUploadProgress(0);
//         setUploadStatus("");
//       }, 1500);
      
//       return uploadedUrls; // ⬅️ array من strings فقط
      
//     } catch (error) {
//       console.error("❌ خطأ في رفع الصور:", error);
      
//       setUploadStatus(`❌ ${error.message || "فشل في رفع الصور"}`);
//       setUploadProgress(0);
      
//       setTimeout(() => {
//         setShowUploadModal(false);
//         setUploadStatus("");
//       }, 3000);
      
//       return []; // ⬅️ نرجع array فارغة في حالة الخطأ
//     }
//   };

//   // 🔥 حفظ المنتج - معدل لـ array of strings
//   const handleSubmit = async () => {
//     if (!formData.name || !formData.price) {
//       setMessage("⚠️ أدخل الاسم والسعر");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMessage("");

//       let finalCategory = formData.category;

//       // إضافة فئة جديدة
//       if (!formData.category && newCategory.trim() !== "") {
//         const res = await fetch("/api/categories", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ name: newCategory }),
//         });
        
//         if (!res.ok) throw new Error("فشل في إضافة الفئة");
        
//         const added = await res.json();
//         finalCategory = added.name;
//         await fetchCategories();
//       }

//       // 🔹 البدء بالصور الحالية (يجب أن تكون array of strings)
//       let allImageUrls = [];
      
//       if (formData.images && formData.images.length > 0) {
//         // تحويل أي بيانات إلى strings فقط
//         allImageUrls = formData.images.map(item => {
//           if (typeof item === 'string') {
//             return item; // ⬅️ إذا كان string مباشرة
//           }
//           // إذا كان object، استخرج الـ URL منه
//           else if (item && typeof item === 'object') {
//             const url = item.url || item.publicUrl || item.link;
//             if (url && typeof url === 'string' && url.startsWith('http')) {
//               return url; // ⬅️ استخرج الـ URL فقط
//             }
//           }
//           return null;
//         }).filter(url => url !== null); // إزالة القيم null
//       }
      
//       console.log('🖼️ الصور الحالية (strings only):', allImageUrls);

//       // 🔥 رفع الصور الجديدة
//       if (imageFiles.length > 0) {
//         try {
//           const newImageUrls = await uploadImages();
          
//           // دمج مع الصور الحالية
//           if (Array.isArray(newImageUrls) && newImageUrls.length > 0) {
//             allImageUrls = [...allImageUrls, ...newImageUrls];
//             console.log('🖼️ بعد إضافة الصور الجديدة:', allImageUrls);
//           }
          
//         } catch (uploadError) {
//           console.error("❌ خطأ في رفع الصور:", uploadError);
//           setMessage(`⚠️ تم حفظ المنتج ولكن حدث خطأ في رفع بعض الصور`);
//         }
//       }

//       // 🔹 التأكد من أن allImageUrls هو array من strings
//       if (!Array.isArray(allImageUrls)) {
//         allImageUrls = [];
//       }

//       // إعداد بيانات المنتج
//       const productData = {
//         ...formData,
//         name: formData.name.trim(),
//         description: formData.description?.trim() || "",
//         price: Number(formData.price),
//         number: formData.number ? Number(formData.number) : null,
//         category: finalCategory || "أخرى",
//         images: allImageUrls, // ⬅️ array من strings فقط
//         video: formData.video?.trim() || "",
//         youtube: formData.youtube?.trim() || "",
//         article: formData.article?.trim() || "",
//         status: formData.status || "active",
//         stock: formData.stock ? Number(formData.stock) : 0,
//         createdAt: formData.id ? formData.createdAt : new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       };
      
//       console.log('📦 بيانات المنتج النهائية:', productData);

//       // إرسال البيانات
//       const method = formData.id ? "PUT" : "POST";
//       const url = "/api/products" + (formData.id ? `?id=${formData.id}` : "");
      
//       const res = await fetch(url, {
//         method: method,
//         headers: { 
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(productData),
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`فشل في الحفظ: ${errorText}`);
//       }

//       const savedProduct = await res.json();
      
//       setMessage(formData.id ? "✅ تم تعديل المنتج بنجاح" : "✅ تم إضافة المنتج بنجاح");
      
//       // إعادة تعيين النموذج
//       setTimeout(() => {
//         setFormData({
//           id: null,
//           name: "",
//           price: "",
//           number: "",
//           description: "",
//           images: [], // ⬅️ array فارغة
//           video: "",
//           youtube: "",
//           article: "",
//           category: "",
//           status: "active",
//           stock: "",
//         });
//         setImageFiles([]);
//         setImagePreviews([]);
//         setNewCategory("");
//         setMessage("");
//       }, 3000);
      
//       await fetchProducts();
      
//     } catch (err) {
//       console.error("💥 خطأ:", err);
//       setMessage(`❌ ${err.message || "حدث خطأ أثناء الحفظ"}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteProduct = async (id) => {
//     if (!confirm("هل أنت متأكد من الحذف؟")) return;
//     try {
//       setLoading(true);
//       const res = await fetch("/api/products", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });

//       if (!res.ok) throw new Error("فشل في الحذف");
//       setMessage("🗑️ تم حذف المنتج");
//       await fetchProducts();
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ حدث خطأ أثناء الحذف");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🟢 حذف صورة من المعاينة
//   const removeImage = (index) => {
//     const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
//     const updatedFiles = imageFiles.filter((_, i) => i !== index);
    
//     setImagePreviews(updatedPreviews);
//     setImageFiles(updatedFiles);
    
//     // تحرير الذاكرة
//     URL.revokeObjectURL(imagePreviews[index]);
//   };

//   // 🟢 تعديل - مع معالجة الصور لـ strings فقط
//   const editProduct = (p) => {
//     // 🔹 معالجة الصور لاستخراج الـ URLs فقط (strings)
//     let processedImages = [];
    
//     if (p.images && p.images.length > 0) {
//       processedImages = p.images.map(item => {
//         if (typeof item === 'string') {
//           return item; // ⬅️ إذا كان string مباشرة
//         }
//         // إذا كان object، استخرج الـ URL منه
//         else if (item && typeof item === 'object') {
//           const url = item.url || item.publicUrl || item.link;
//           if (url && typeof url === 'string' && url.startsWith('http')) {
//             return url; // ⬅️ استخرج الـ URL فقط
//           }
//         }
//         return null;
//       }).filter(url => url !== null); // إزالة القيم null
//     }
    
//     console.log('✏️ تحرير المنتج - الصور:', processedImages);
    
//     setFormData({
//       ...p,
//       category: p.category?.name || p.category || "",
//       number: p.number || "",
//       images: processedImages // ⬅️ array من strings فقط
//     });
    
//     // عرض معاينة الصور
//     setImagePreviews(processedImages);
//     setImageFiles([]); // إعادة تعيين الملفات الجديدة
    
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <Container className="py-5">
//       <h2 className="text-center mb-4">🛍️ لوحة إدارة المتجر</h2>

//       {message && (
//         <Alert variant={message.includes("✅") ? "success" : "danger"} onClose={() => setMessage("")} dismissible>
//           {message}
//         </Alert>
//       )}

//       {/* 🔹 مودال عرض حالة الرفع */}
//       <Modal show={showUploadModal} onHide={() => {}} centered backdrop="static">
//         <Modal.Header>
//           <Modal.Title>رفع الصور</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="text-center">
//             <Spinner animation="border" variant="primary" className="mb-3" />
//             <h5>{uploadStatus}</h5>
//             <ProgressBar 
//               now={uploadProgress} 
//               label={`${uploadProgress}%`}
//               animated 
//               striped 
//               variant="success"
//               className="mt-3"
//             />
//           </div>
//         </Modal.Body>
//       </Modal>

//       {/* نموذج الإضافة */}
//       <div className="card shadow-lg border-0 mb-5">
//         <div className="card-header bg-primary text-white">
//           <h5 className="mb-0">
//             {formData.id ? "✏️ تعديل المنتج" : "➕ إضافة منتج جديد"}
//           </h5>
//         </div>
//         <div className="card-body">
//           <Form>
//             <Row className="g-3">
//               <Col md={3}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">اسم المنتج *</Form.Label>
//                   <Form.Control
//                     placeholder="اسم المنتج"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>

//               <Col md={2}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">السعر *</Form.Label>
//                   <Form.Control
//                     type="number"
//                     placeholder="السعر"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>

//               <Col md={2}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">الرقم</Form.Label>
//                   <Form.Control
//                     type="number"
//                     placeholder="الرقم"
//                     name="number"
//                     value={formData.number}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>

//               <Col md={3}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">الوصف القصير</Form.Label>
//                   <Form.Control
//                     placeholder="الوصف القصير"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>

//               <Col md={2}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">المخزون</Form.Label>
//                   <Form.Control
//                     type="number"
//                     placeholder="الكمية"
//                     name="stock"
//                     value={formData.stock}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">الوصف الطويل</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={2}
//                     placeholder="المقال أو الوصف الطويل"
//                     name="article"
//                     value={formData.article}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>

//               <Col md={3}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">رابط يوتيوب</Form.Label>
//                   <Form.Control
//                     type="url"
//                     placeholder="رابط يوتيوب"
//                     name="youtube"
//                     value={formData.youtube}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>

//               <Col md={3}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">الحالة</Form.Label>
//                   <Form.Select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                   >
//                     <option value="active">🟢 متاح</option>
//                     <option value="out_of_stock">🔴 غير متوفر</option>
//                     <option value="coming_soon">🟡 قريباً</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>

//               {/* اختيار الفئة */}
//               <Col md={4}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">الفئة</Form.Label>
//                   <Form.Select
//                     name="category"
//                     value={formData.category}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (value === "new") {
//                         setFormData({ ...formData, category: "" });
//                       } else {
//                         setFormData({ ...formData, category: value });
//                       }
//                     }}
//                   >
//                     <option value="">اختر الفئة</option>
//                     {categories.map((cat) => (
//                       <option key={cat.id} value={cat.name}>
//                         {cat.name}
//                       </option>
//                     ))}
//                     <option value="new">+ إضافة فئة جديدة</option>
//                   </Form.Select>

//                   {formData.category === "" && (
//                     <Form.Control
//                       type="text"
//                       placeholder="اكتب فئة جديدة"
//                       className="mt-2"
//                       value={newCategory}
//                       onChange={(e) => setNewCategory(e.target.value)}
//                     />
//                   )}
//                 </Form.Group>
//               </Col>

//               {/* رفع الصور */}
//               <Col md={8}>
//                 <Form.Group>
//                   <Form.Label className="fw-bold">
//                     صور المنتج ({imageFiles.length} صورة جاهزة)
//                   </Form.Label>
                  
//                   <div className="border rounded p-3 bg-light">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       <div>
//                         <Button
//                           variant="outline-primary"
//                           size="sm"
//                           onClick={() => document.getElementById('image-upload').click()}
//                         >
//                           📁 اختر صور
//                         </Button>
//                         <Form.Text className="text-muted ms-2">
//                           يدعم JPEG, PNG, WebP - حد أقصى 10MB لكل صورة
//                         </Form.Text>
//                       </div>
                      
//                       {imageFiles.length > 0 && (
//                         <Button
//                           variant="outline-danger"
//                           size="sm"
//                           onClick={() => {
//                             setImageFiles([]);
//                             setImagePreviews([]);
//                             imagePreviews.forEach(url => URL.revokeObjectURL(url));
//                           }}
//                         >
//                           🗑️ مسح الكل
//                         </Button>
//                       )}
//                     </div>
                    
//                     <Form.Control
//                       id="image-upload"
//                       type="file"
//                       accept="image/jpeg, image/jpg, image/png, image/webp"
//                       multiple
//                       onChange={handleImageUpload}
//                       style={{ display: 'none' }}
//                     />
                    
//                     {/* معاينة الصور */}
//                     {imagePreviews.length > 0 && (
//                       <div className="mt-3">
//                         <h6 className="mb-2">معاينة الصور:</h6>
//                         <div className="row g-2">
//                           {imagePreviews.map((preview, index) => (
//                             <div key={index} className="col-6 col-md-3 col-lg-2">
//                               <div className="position-relative border rounded p-1 bg-white">
//                                 <img 
//                                   src={preview} 
//                                   alt={`Preview ${index + 1}`}
//                                   className="img-fluid rounded"
//                                   style={{ 
//                                     height: '100px',
//                                     width: '100%',
//                                     objectFit: 'cover'
//                                   }}
//                                 />
//                                 <Badge 
//                                   bg="secondary" 
//                                   className="position-absolute top-0 start-0 m-1"
//                                 >
//                                   {index + 1}
//                                 </Badge>
//                                 <Button
//                                   variant="danger"
//                                   size="sm"
//                                   className="position-absolute top-0 end-0 m-1 p-0"
//                                   style={{ width: '24px', height: '24px' }}
//                                   onClick={() => removeImage(index)}
//                                 >
//                                   ×
//                                 </Button>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </Form.Group>
//               </Col>

//               {/* زر الحفظ */}
//               <Col md={12}>
//                 <div className="d-flex justify-content-end gap-2 mt-3">
//                   {formData.id && (
//                     <Button
//                       variant="outline-secondary"
//                       onClick={() => {
//                         setFormData({
//                           id: null,
//                           name: "",
//                           price: "",
//                           number: "",
//                           description: "",
//                           images: [], // ⬅️ array فارغة
//                           video: "",
//                           youtube: "",
//                           article: "",
//                           category: "",
//                           status: "active",
//                           stock: "",
//                         });
//                         setImageFiles([]);
//                         setImagePreviews([]);
//                       }}
//                     >
//                       إلغاء التعديل
//                     </Button>
//                   )}
//                   <Button
//                     variant={formData.id ? "warning" : "success"}
//                     size="lg"
//                     onClick={handleSubmit}
//                     disabled={loading}
//                     className="px-4"
//                   >
//                     {loading ? (
//                       <>
//                         <Spinner animation="border" size="sm" className="me-2" />
//                         جاري الحفظ...
//                       </>
//                     ) : formData.id ? (
//                       "💾 حفظ التعديلات"
//                     ) : (
//                       "➕ إضافة المنتج"
//                     )}
//                   </Button>
//                 </div>
//               </Col>
//             </Row>
//           </Form>
//         </div>
//       </div>

//       {/* فلترة الفئات */}
//       <div className="card shadow-sm border-0 mb-4">
//         <div className="card-body">
//           <div className="row align-items-center">
//             <div className="col-md-6">
//               <Form.Select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//               >
//                 <option value="الكل">📂 جميع المنتجات</option>
//                 {categories.map((cat) => (
//                   <option key={cat.id} value={cat.name}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </div>
//             <div className="col-md-6 text-md-end mt-2 mt-md-0">
//               <Badge bg="info" className="fs-6 p-2">
//                 عدد المنتجات: {filteredProducts.length}
//               </Badge>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* جدول المنتجات */}
//       <div className="card shadow-lg border-0">
//         <div className="card-header bg-dark text-white">
//           <h5 className="mb-0">📋 قائمة المنتجات</h5>
//         </div>
//         <div className="card-body p-0">
//           {loading ? (
//             <div className="text-center py-5">
//               <Spinner animation="border" variant="primary" />
//               <p className="mt-3">جارٍ تحميل المنتجات...</p>
//             </div>
//           ) : (
//             <div className="table-responsive">
//               <Table hover className="mb-0">
//                 <thead className="table-dark">
//                   <tr>
//                     <th width="100">الصور</th>
//                     <th>الاسم</th>
//                     <th width="120">السعر</th>
//                     <th width="100">الرقم</th>
//                     <th width="150">الفئة</th>
//                     <th width="120">المخزون</th>
//                     <th width="120">الحالة</th>
//                     <th width="180" className="text-center">الإجراءات</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredProducts.length > 0 ? (
//                     filteredProducts.map((p) => {
//                       // 🔹 معالجة الصور للعرض (strings فقط)
//                       let productImages = [];
                      
//                       if (p.images && p.images.length > 0) {
//                         productImages = p.images.map(item => {
//                           if (typeof item === 'string') {
//                             return item; // ⬅️ string مباشرة
//                           }
//                           // إذا كان object، استخرج الـ URL منه
//                           else if (item && typeof item === 'object') {
//                             const url = item.url || item.publicUrl || item.link;
//                             if (url && typeof url === 'string' && url.startsWith('http')) {
//                               return url;
//                             }
//                           }
//                           return null;
//                         }).filter(url => url !== null);
//                       }
                      
//                       return (
//                         <tr key={p.id}>
//                           <td>
//                             <div className="position-relative">
//                               <img
//                                 src={productImages[0] || "https://via.placeholder.com/80"}
//                                 alt={p.name}
//                                 className="rounded border"
//                                 style={{ 
//                                   width: "80px", 
//                                   height: "80px", 
//                                   objectFit: "cover" 
//                                 }}
//                               />
//                               {productImages.length > 1 && (
//                                 <Badge 
//                                   bg="primary" 
//                                   className="position-absolute top-0 end-0 translate-middle"
//                                 >
//                                   +{productImages.length - 1}
//                                 </Badge>
//                               )}
//                             </div>
//                           </td>
//                           <td>
//                             <div>
//                               <strong>{p.name}</strong>
//                               {p.description && (
//                                 <p className="text-muted small mb-0 mt-1">
//                                   {p.description.slice(0, 60)}...
//                                 </p>
//                               )}
//                             </div>
//                           </td>
//                           <td>
//                             <span className="fw-bold text-success">
//                               {p.price} ج.م
//                             </span>
//                           </td>
//                           <td>
//                             {p.number ? (
//                               <Badge bg="secondary" className="fs-6">
//                                 #{p.number}
//                               </Badge>
//                             ) : (
//                               <span className="text-muted">—</span>
//                             )}
//                           </td>
//                           <td>
//                             <Badge bg="outline-primary" className="border text-dark">
//                               {p.category || "—"}
//                             </Badge>
//                           </td>
//                           <td>
//                             <div className={`px-2 py-1 rounded ${p.stock > 10 ? 'bg-success text-white' : p.stock > 0 ? 'bg-warning text-dark' : 'bg-danger text-white'}`}>
//                               {p.stock || 0}
//                             </div>
//                           </td>
//                           <td>
//                             {p.status === 'active' && (
//                               <Badge bg="success">🟢 متاح</Badge>
//                             )}
//                             {p.status === 'out_of_stock' && (
//                               <Badge bg="danger">🔴 غير متوفر</Badge>
//                             )}
//                             {p.status === 'coming_soon' && (
//                               <Badge bg="warning" text="dark">🟡 قريباً</Badge>
//                             )}
//                           </td>
//                           <td className="text-center">
//                             <div className="btn-group" role="group">
//                               <Button
//                                 variant="outline-warning"
//                                 size="sm"
//                                 onClick={() => editProduct(p)}
//                                 title="تعديل"
//                               >
//                                 ✏️
//                               </Button>
//                               <Button
//                                 variant="outline-info"
//                                 size="sm"
//                                 href={`/store/${p.id}`}
//                                 target="_blank"
//                                 title="عرض"
//                               >
//                                 👁️
//                               </Button>
//                               <Button
//                                 variant="outline-danger"
//                                 size="sm"
//                                 onClick={() => deleteProduct(p.id)}
//                                 title="حذف"
//                               >
//                                 🗑️
//                               </Button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td colSpan="8" className="text-center py-4">
//                         <Alert variant="info">
//                           <h5>📭 لا توجد منتجات</h5>
//                           <p>لم يتم إضافة أي منتجات بعد</p>
//                           <Button 
//                             variant="primary" 
//                             onClick={() => setSelectedCategory("الكل")}
//                           >
//                             عرض جميع المنتجات
//                           </Button>
//                         </Alert>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* معلومات إضافية */}
//       <div className="mt-4 text-center text-muted">
//         <small>
//           ⚡ نظام متقدم لإدارة المنتجات | 📊 {products.length} منتج إجمالاً
//         </small>
//       </div>
//     </Container>
//   );
// }




"use client";

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  Row,
  Col,
  Spinner,
  Alert,
  Modal,
  ProgressBar,
  Badge,
  InputGroup
} from "react-bootstrap";

// في الداشبورد استخدم المفتاح العام فقط
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// 🔥 دالة مساعدة لتحديد لون الـ stock
const getStockBadgeColor = (stock) => {
  if (stock <= 0) return 'bg-danger text-white';
  if (stock <= 10) return 'bg-warning text-dark';
  return 'bg-success text-white';
};

// 🔥 دالة مساعدة لعرض حالة المنتج
const getStatusBadge = (status, stock) => {
  if (status === 'active') {
    return stock <= 0 
      ? <Badge bg="warning" text="dark">🟡 غير متوفر</Badge>
      : <Badge bg="success">🟢 متاح</Badge>;
  }
  if (status === 'out_of_stock') {
    return <Badge bg="danger">🔴 غير متوفر</Badge>;
  }
  if (status === 'coming_soon') {
    return <Badge bg="info">🟡 قريباً</Badge>;
  }
  return <Badge bg="secondary">—</Badge>;
};

export default function DashboardProducts() {
  const [products, setProducts] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    price: "",
    number: "",
    description: "",
    images: [],
    video: "",
    youtube: "",
    article: "",
    category: "",
    status: "active",
    stock: 0
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [stockFilter, setStockFilter] = useState("الكل"); // ⬅️ فلتر جديد للمخزون

  // 🟢 تحميل الفئات
  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  // 🟢 تحميل المنتجات
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("فشل في تحميل المنتجات");
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error(err);
      setMessage("❌ حدث خطأ أثناء تحميل المنتجات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // 🟢 فلترة حسب الفئة والمخزون
  useEffect(() => {
    let filtered = products;

    // الفلترة حسب الفئة
    if (selectedCategory !== "الكل") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // الفلترة حسب المخزون
    if (stockFilter !== "الكل") {
      switch (stockFilter) {
        case "متوفر":
          filtered = filtered.filter((p) => (p.stock || 0) > 0);
          break;
        case "غير متوفر":
          filtered = filtered.filter((p) => (p.stock || 0) <= 0);
          break;
        case "محدود":
          filtered = filtered.filter((p) => (p.stock || 0) > 0 && (p.stock || 0) <= 10);
          break;
        case "كثير":
          filtered = filtered.filter((p) => (p.stock || 0) > 10);
          break;
      }
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, products, stockFilter]);

  // 🟢 تحديث الفورم مع التحقق من stock
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // التحقق من قيمة stock
    if (name === 'stock') {
      const stockValue = parseInt(value) || 0;
      setFormData({ ...formData, [name]: Math.max(0, stockValue) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 🟢 رفع صور متعددة
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    // 🔹 التحقق من أنواع الملفات المسموحة
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setMessage(`⚠️ أنواع الملفات غير مدعومة: ${invalidFiles.map(f => f.name).join(', ')}`);
      return;
    }
    
    // 🔹 التحقق من حجم الملفات
    const maxSize = 10 * 1024 * 1024; // 10MB
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      setMessage(`⚠️ الملفات التالية أكبر من 10MB: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }
    
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    const allPreviews = [...imagePreviews, ...newPreviews];
    const allFiles = [...imageFiles, ...files];
    
    setImagePreviews(allPreviews);
    setImageFiles(allFiles);
    
    setMessage(`✅ تم إضافة ${files.length} صورة للرفع`);
  };

  // 🔥 دالة رفع الصور
  const uploadImages = async () => {
    if (imageFiles.length === 0) return [];
    
    setShowUploadModal(true);
    setUploadStatus("جاري ضغط الصور...");
    setUploadProgress(10);
    
    try {
      const formDataToSend = new FormData();
      
      imageFiles.forEach((file) => {
        formDataToSend.append('images', file);
      });
      
      setUploadStatus("جاري رفع الصور إلى السيرفر...");
      setUploadProgress(30);
      
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formDataToSend,
      });
      
      if (!uploadRes.ok) {
        throw new Error(`خطأ في السيرفر: ${uploadRes.status}`);
      }
      
      const result = await uploadRes.json();
      console.log("📥 استجابة الرفع:", result);
      
      let uploadedUrls = [];
      
      if (result && result.uploadedUrls && Array.isArray(result.uploadedUrls)) {
        uploadedUrls = result.uploadedUrls.map(item => {
          if (typeof item === 'string') {
            return item;
          } else if (item && typeof item === 'object') {
            const url = item.url || item.publicUrl || item.link;
            if (url && url.startsWith('http')) {
              return url;
            }
          }
          return null;
        }).filter(url => url !== null);
      }
      
      console.log("🔗 الـ URLs المستخرجة:", uploadedUrls);
      
      setUploadProgress(80);
      setUploadStatus(`تم رفع ${uploadedUrls.length} صورة بنجاح`);
      setUploadProgress(100);
      
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadProgress(0);
        setUploadStatus("");
      }, 1500);
      
      return uploadedUrls;
      
    } catch (error) {
      console.error("❌ خطأ في رفع الصور:", error);
      
      setUploadStatus(`❌ ${error.message || "فشل في رفع الصور"}`);
      setUploadProgress(0);
      
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadStatus("");
      }, 3000);
      
      return [];
    }
  };

  // 🔥 حفظ المنتج
  const handleSubmit = async () => {
    if (!formData.name || !formData.price) {
      setMessage("⚠️ أدخل الاسم والسعر");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      let finalCategory = formData.category;

      // إضافة فئة جديدة
      if (!formData.category && newCategory.trim() !== "") {
        const res = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newCategory }),
        });
        
        if (!res.ok) throw new Error("فشل في إضافة الفئة");
        
        const added = await res.json();
        finalCategory = added.name;
        await fetchCategories();
      }

      // 🔹 معالجة الصور الحالية
      let allImageUrls = [];
      
      if (formData.images && formData.images.length > 0) {
        allImageUrls = formData.images.map(item => {
          if (typeof item === 'string') {
            return item;
          } else if (item && typeof item === 'object') {
            const url = item.url || item.publicUrl || item.link;
            if (url && typeof url === 'string' && url.startsWith('http')) {
              return url;
            }
          }
          return null;
        }).filter(url => url !== null);
      }
      
      console.log('🖼️ الصور الحالية:', allImageUrls);

      // 🔥 رفع الصور الجديدة
      if (imageFiles.length > 0) {
        try {
          const newImageUrls = await uploadImages();
          
          if (Array.isArray(newImageUrls) && newImageUrls.length > 0) {
            allImageUrls = [...allImageUrls, ...newImageUrls];
            console.log('🖼️ بعد إضافة الصور الجديدة:', allImageUrls);
          }
          
        } catch (uploadError) {
          console.error("❌ خطأ في رفع الصور:", uploadError);
          setMessage(`⚠️ تم حفظ المنتج ولكن حدث خطأ في رفع بعض الصور`);
        }
      }

      if (!Array.isArray(allImageUrls)) {
        allImageUrls = [];
      }

      // تحديث حالة المنتج بناءً على المخزون
      let finalStatus = formData.status;
      if (formData.stock <= 0 && formData.status === 'active') {
        finalStatus = 'out_of_stock';
      } else if (formData.stock > 0 && formData.status === 'out_of_stock') {
        finalStatus = 'active';
      }

      // إعداد بيانات المنتج
      const productData = {
        ...formData,
        name: formData.name.trim(),
        description: formData.description?.trim() || "",
        price: Number(formData.price),
        number: formData.number ? Number(formData.number) : null,
        category: finalCategory || "أخرى",
        images: allImageUrls,
        video: formData.video?.trim() || "",
        youtube: formData.youtube?.trim() || "",
        article: formData.article?.trim() || "",
        status: finalStatus,
        stock: formData.stock || 0,
        createdAt: formData.id ? formData.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      console.log('📦 بيانات المنتج النهائية:', productData);

      // إرسال البيانات
      const method = formData.id ? "PUT" : "POST";
      const url = "/api/products" + (formData.id ? `?id=${formData.id}` : "");
      
      const res = await fetch(url, {
        method: method,
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`فشل في الحفظ: ${errorText}`);
      }

      const savedProduct = await res.json();
      
      setMessage(formData.id ? "✅ تم تعديل المنتج بنجاح" : "✅ تم إضافة المنتج بنجاح");
      
      // إعادة تعيين النموذج
      setTimeout(() => {
        setFormData({
          id: null,
          name: "",
          price: "",
          number: "",
          description: "",
          images: [],
          video: "",
          youtube: "",
          article: "",
          category: "",
          status: "active",
          stock: 0
        });
        setImageFiles([]);
        setImagePreviews([]);
        setNewCategory("");
        setMessage("");
      }, 3000);
      
      await fetchProducts();
      
    } catch (err) {
      console.error("💥 خطأ:", err);
      setMessage(`❌ ${err.message || "حدث خطأ أثناء الحفظ"}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("هل أنت متأكد من حذف المنتج؟")) return;
    try {
      setLoading(true);
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("فشل في الحذف");
      setMessage("🗑️ تم حذف المنتج");
      await fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage("❌ حدث خطأ أثناء الحذف");
    } finally {
      setLoading(false);
    }
  };

  // 🟢 حذف صورة من المعاينة
  const removeImage = (index) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    
    setImagePreviews(updatedPreviews);
    setImageFiles(updatedFiles);
    
    URL.revokeObjectURL(imagePreviews[index]);
  };

  // 🟢 تعديل المنتج
  const editProduct = (p) => {
    let processedImages = [];
    
    if (p.images && p.images.length > 0) {
      processedImages = p.images.map(item => {
        if (typeof item === 'string') {
          return item;
        } else if (item && typeof item === 'object') {
          const url = item.url || item.publicUrl || item.link;
          if (url && typeof url === 'string' && url.startsWith('http')) {
            return url;
          }
        }
        return null;
      }).filter(url => url !== null);
    }
    
    console.log('✏️ تحرير المنتج - الصور:', processedImages);
    
    setFormData({
      ...p,
      category: p.category?.name || p.category || "",
      number: p.number || "",
      images: processedImages,
      stock: p.stock || 0
    });
    
    setImagePreviews(processedImages);
    setImageFiles([]);
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🔥 تحديث المخزون مباشرة من الجدول
  const updateStock = async (productId, newStock) => {
    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: productId,
          stock: parseInt(newStock) || 0,
          status: newStock <= 0 ? 'out_of_stock' : 'active',
          updatedAt: new Date().toISOString()
        }),
      });

      if (!res.ok) throw new Error("فشل في تحديث المخزون");
      
      await fetchProducts();
      setMessage("✅ تم تحديث المخزون بنجاح");
      
    } catch (err) {
      console.error(err);
      setMessage("❌ حدث خطأ أثناء تحديث المخزون");
    }
  };

  // 🔥 زيادة أو نقصان المخزون مباشرة
  const adjustStock = (productId, currentStock, adjustment) => {
    const newStock = Math.max(0, (currentStock || 0) + adjustment);
    updateStock(productId, newStock);
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">🛍️ لوحة إدارة المتجر</h2>

      {message && (
        <Alert variant={message.includes("✅") ? "success" : "danger"} onClose={() => setMessage("")} dismissible>
          {message}
        </Alert>
      )}

      {/* 🔹 مودال عرض حالة الرفع */}
      <Modal show={showUploadModal} onHide={() => {}} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>رفع الصور</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <h5>{uploadStatus}</h5>
            <ProgressBar 
              now={uploadProgress} 
              label={`${uploadProgress}%`}
              animated 
              striped 
              variant="success"
              className="mt-3"
            />
          </div>
        </Modal.Body>
      </Modal>

      {/* نموذج الإضافة */}
      <div className="card shadow-lg border-0 mb-5">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            {formData.id ? "✏️ تعديل المنتج" : "➕ إضافة منتج جديد"}
          </h5>
        </div>
        <div className="card-body">
          <Form>
            <Row className="g-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label className="fw-bold">اسم المنتج *</Form.Label>
                  <Form.Control
                    placeholder="اسم المنتج"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={2}>
                <Form.Group>
                  <Form.Label className="fw-bold">السعر *</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="السعر"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={2}>
                <Form.Group>
                  <Form.Label className="fw-bold">الرقم</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="الرقم"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label className="fw-bold">الوصف القصير</Form.Label>
                  <Form.Control
                    placeholder="الوصف القصير"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              {/* 🔥 حقل المخزون */}
              <Col md={2}>
                <Form.Group>
                  <Form.Label className="fw-bold d-flex justify-content-between">
                    <span>المخزون</span>
                    {formData.stock <= 0 ? (
                      <Badge bg="danger" className="ms-2">🔴</Badge>
                    ) : formData.stock <= 10 ? (
                      <Badge bg="warning" className="ms-2" text="dark">🟡</Badge>
                    ) : (
                      <Badge bg="success" className="ms-2">🟢</Badge>
                    )}
                  </Form.Label>
                  <InputGroup>
                    <Button 
                      variant="outline-secondary"
                      onClick={() => handleChange({ target: { name: 'stock', value: Math.max(0, (formData.stock || 0) - 1) } })}
                    >
                      -
                    </Button>
                    <Form.Control
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      min="0"
                      className="text-center"
                    />
                    <Button 
                      variant="outline-secondary"
                      onClick={() => handleChange({ target: { name: 'stock', value: (formData.stock || 0) + 1 } })}
                    >
                      +
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">الوصف الطويل</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="الوصف التفصيلي للمنتج"
                    name="article"
                    value={formData.article}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label className="fw-bold">رابط يوتيوب</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="رابط يوتيوب"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              {/* 🔥 حقل الحالة */}
              <Col md={3}>
                <Form.Group>
                  <Form.Label className="fw-bold">الحالة</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setFormData({ 
                        ...formData, 
                        status: newStatus,
                        stock: newStatus === 'out_of_stock' ? 0 : formData.stock
                      });
                    }}
                  >
                    <option value="active">🟢 متاح</option>
                    <option value="out_of_stock">🔴 غير متوفر</option>
                    <option value="coming_soon">🟡 قريباً</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* اختيار الفئة */}
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="fw-bold">الفئة</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "new") {
                        setFormData({ ...formData, category: "" });
                      } else {
                        setFormData({ ...formData, category: value });
                      }
                    }}
                  >
                    <option value="">اختر الفئة</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                    <option value="new">+ إضافة فئة جديدة</option>
                  </Form.Select>

                  {formData.category === "" && (
                    <Form.Control
                      type="text"
                      placeholder="اكتب فئة جديدة"
                      className="mt-2"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                  )}
                </Form.Group>
              </Col>

              {/* رفع الصور */}
              <Col md={8}>
                <Form.Group>
                  <Form.Label className="fw-bold">
                    صور المنتج ({imageFiles.length} صورة جاهزة)
                  </Form.Label>
                  
                  <div className="border rounded p-3 bg-light">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => document.getElementById('image-upload').click()}
                        >
                          📁 اختر صور
                        </Button>
                        <Form.Text className="text-muted ms-2">
                          يدعم JPEG, PNG, WebP - حد أقصى 10MB لكل صورة
                        </Form.Text>
                      </div>
                      
                      {imageFiles.length > 0 && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => {
                            setImageFiles([]);
                            setImagePreviews([]);
                            imagePreviews.forEach(url => URL.revokeObjectURL(url));
                          }}
                        >
                          🗑️ مسح الكل
                        </Button>
                      )}
                    </div>
                    
                    <Form.Control
                      id="image-upload"
                      type="file"
                      accept="image/jpeg, image/jpg, image/png, image/webp"
                      multiple
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                    
                    {/* معاينة الصور */}
                    {imagePreviews.length > 0 && (
                      <div className="mt-3">
                        <h6 className="mb-2">معاينة الصور:</h6>
                        <div className="row g-2">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="col-6 col-md-3 col-lg-2">
                              <div className="position-relative border rounded p-1 bg-white">
                                <img 
                                  src={preview} 
                                  alt={`Preview ${index + 1}`}
                                  className="img-fluid rounded"
                                  style={{ 
                                    height: '100px',
                                    width: '100%',
                                    objectFit: 'cover'
                                  }}
                                />
                                <Badge 
                                  bg="secondary" 
                                  className="position-absolute top-0 start-0 m-1"
                                >
                                  {index + 1}
                                </Badge>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  className="position-absolute top-0 end-0 m-1 p-0"
                                  style={{ width: '24px', height: '24px' }}
                                  onClick={() => removeImage(index)}
                                >
                                  ×
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Form.Group>
              </Col>

              {/* زر الحفظ */}
              <Col md={12}>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  {formData.id && (
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        setFormData({
                          id: null,
                          name: "",
                          price: "",
                          number: "",
                          description: "",
                          images: [],
                          video: "",
                          youtube: "",
                          article: "",
                          category: "",
                          status: "active",
                          stock: 0
                        });
                        setImageFiles([]);
                        setImagePreviews([]);
                      }}
                    >
                      إلغاء التعديل
                    </Button>
                  )}
                  <Button
                    variant={formData.id ? "warning" : "success"}
                    size="lg"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-4"
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        جاري الحفظ...
                      </>
                    ) : formData.id ? (
                      "💾 حفظ التعديلات"
                    ) : (
                      "➕ إضافة المنتج"
                    )}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>

      {/* 🔥 فلترة المنتجات */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <Row className="align-items-center">
            <Col md={4} className="mb-2">
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="الكل">📂 جميع المنتجات</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            
            <Col md={4} className="mb-2">
              <Form.Select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
              >
                <option value="الكل">📊 جميع المخزون</option>
                <option value="متوفر">🟢 متوفر</option>
                <option value="غير متوفر">🔴 غير متوفر</option>
                <option value="محدود">🟡 محدود (أقل من 10)</option>
                <option value="كثير">🟢 كثير (أكثر من 10)</option>
              </Form.Select>
            </Col>
            
            <Col md={4} className="text-md-end">
              <Badge bg="info" className="fs-6 p-2 me-2">
                المنتجات: {filteredProducts.length}
              </Badge>
              <Badge bg="success" className="fs-6 p-2">
                المخزون: {filteredProducts.reduce((sum, p) => sum + (p.stock || 0), 0)}
              </Badge>
            </Col>
          </Row>
        </div>
      </div>

      {/* 🔥 جدول المنتجات */}
      <div className="card shadow-lg border-0">
        <div className="card-header bg-dark text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">📋 قائمة المنتجات</h5>
            <div>
              <Button 
                variant="outline-light" 
                size="sm"
                onClick={fetchProducts}
                disabled={loading}
              >
                🔄 تحديث
              </Button>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">جارٍ تحميل المنتجات...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="table-dark">
                  <tr>
                    <th width="100">الصور</th>
                    <th>الاسم</th>
                    <th width="120">السعر</th>
                    <th width="100">الرقم</th>
                    <th width="150">الفئة</th>
                    <th width="150">المخزون</th>
                    <th width="120">الحالة</th>
                    <th width="200" className="text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => {
                      let productImages = [];
                      
                      if (p.images && p.images.length > 0) {
                        productImages = p.images.map(item => {
                          if (typeof item === 'string') {
                            return item;
                          } else if (item && typeof item === 'object') {
                            const url = item.url || item.publicUrl || item.link;
                            if (url && typeof url === 'string' && url.startsWith('http')) {
                              return url;
                            }
                          }
                          return null;
                        }).filter(url => url !== null);
                      }
                      
                      return (
                        <tr key={p.id}>
                          <td>
                            <div className="position-relative">
                              <img
                                src={productImages[0] || "https://via.placeholder.com/80"}
                                alt={p.name}
                                className="rounded border"
                                style={{ 
                                  width: "80px", 
                                  height: "80px", 
                                  objectFit: "cover" 
                                }}
                              />
                              {productImages.length > 1 && (
                                <Badge 
                                  bg="primary" 
                                  className="position-absolute top-0 end-0 translate-middle"
                                >
                                  +{productImages.length - 1}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td>
                            <div>
                              <strong>{p.name}</strong>
                              {p.description && (
                                <p className="text-muted small mb-0 mt-1">
                                  {p.description.slice(0, 60)}...
                                </p>
                              )}
                            </div>
                          </td>
                          <td>
                            <span className="fw-bold text-success">
                              {p.price} ج.م
                            </span>
                          </td>
                          <td>
                            {p.number ? (
                              <Badge bg="secondary" className="fs-6">
                                #{p.number}
                              </Badge>
                            ) : (
                              <span className="text-muted">—</span>
                            )}
                          </td>
                          <td>
                            <Badge bg="outline-primary" className="border text-dark">
                              {p.category || "—"}
                            </Badge>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <InputGroup size="sm" style={{ width: '120px' }}>
                                <Button 
                                  variant="outline-secondary"
                                  onClick={() => adjustStock(p.id, p.stock || 0, -1)}
                                >
                                  -
                                </Button>
                                <Form.Control
                                  type="number"
                                  value={p.stock || 0}
                                  onChange={(e) => updateStock(p.id, e.target.value)}
                                  className="text-center"
                                  style={{ backgroundColor: getStockBadgeColor(p.stock || 0).includes('bg-') ? '' : '#fff' }}
                                />
                                <Button 
                                  variant="outline-secondary"
                                  onClick={() => adjustStock(p.id, p.stock || 0, 1)}
                                >
                                  +
                                </Button>
                              </InputGroup>
                              <div className={`px-2 py-1 rounded ms-2 ${getStockBadgeColor(p.stock || 0)}`}>
                                {p.stock || 0}
                              </div>
                            </div>
                          </td>
                          <td>
                            {getStatusBadge(p.status || 'active', p.stock || 0)}
                          </td>
                          <td className="text-center">
                            <div className="btn-group" role="group">
                              <Button
                                variant="outline-warning"
                                size="sm"
                                onClick={() => editProduct(p)}
                                title="تعديل"
                              >
                                ✏️
                              </Button>
                              <Button
                                variant="outline-info"
                                size="sm"
                                href={`/store/${p.id}`}
                                target="_blank"
                                title="عرض"
                              >
                                👁️
                              </Button>
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => adjustStock(p.id, p.stock || 0, 10)}
                                title="إضافة 10"
                              >
                                +10
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => deleteProduct(p.id)}
                                title="حذف"
                              >
                                🗑️
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        <Alert variant="info">
                          <h5>📭 لا توجد منتجات</h5>
                          <p>لم يتم إضافة أي منتجات بعد أو لا توجد منتجات تطابق الفلتر</p>
                          <Button 
                            variant="primary" 
                            onClick={() => {
                              setSelectedCategory("الكل");
                              setStockFilter("الكل");
                            }}
                            className="me-2"
                          >
                            عرض جميع المنتجات
                          </Button>
                          <Button 
                            variant="success" 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          >
                            ➕ إضافة منتج جديد
                          </Button>
                        </Alert>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* 🔥 إحصائيات المخزون */}
      <div className="row mt-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h5>🟢 متوفر</h5>
              <h3>{filteredProducts.filter(p => (p.stock || 0) > 0).length}</h3>
              <small>منتج</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h5>🔴 غير متوفر</h5>
              <h3>{filteredProducts.filter(p => (p.stock || 0) <= 0).length}</h3>
              <small>منتج</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-dark">
            <div className="card-body text-center">
              <h5>🟡 محدود</h5>
              <h3>{filteredProducts.filter(p => (p.stock || 0) > 0 && (p.stock || 0) <= 10).length}</h3>
              <small>منتج</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h5>📊 إجمالي المخزون</h5>
              <h3>{filteredProducts.reduce((sum, p) => sum + (p.stock || 0), 0)}</h3>
              <small>قطعة</small>
            </div>
          </div>
        </div>
      </div>

      {/* معلومات إضافية */}
      <div className="mt-4 text-center text-muted">
        <small>
          ⚡ نظام متقدم لإدارة المنتجات والمخزون | 
          📊 {products.length} منتج إجمالاً | 
          🛒 إدارة المخزون المباشرة
        </small>
      </div>
    </Container>
  );
}