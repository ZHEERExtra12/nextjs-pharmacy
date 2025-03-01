"use client";

import { useState } from "react";
export default function Home() {
  const [form, setForm] = useState<{username:string, password:string}>({username: "", password: ""});
  const [error, setError] = useState<string>("")
  const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setForm({...form,[e.target.name]: e.target.value})
  }




  const handleLogin = async () => {
    const { username, password } = form;
    try {
      
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      
      if (!response.ok) {
        
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        setError(errorData.message); 
        return;
      }
  
      
      const data = await response.json();
      console.log("Login successful:", data.message);
      alert(data.message); // Show success message
  
    } catch (err: any) {
      console.error("Error during login:", err);
      setError("Something went wrong. Please try again later."); 
    }
  };

  

  return (
    <div className="flex flex-row w-full h-full">
      <div className="bg-green-300 w-1/2 h-screen flex flex-col justify-center items-center">
        <img className="w-[200px] h-[200px]" src="/bro.webp" alt="" />
        <h1 className="text-2xl font-bold font-noto text-gray-900">نۆرینگەی ‌‌هێور</h1>
      </div>

      <div className=" w-1/2 h-screen flex flex-col justify-center items-center font-noto">
      <h1 className="text-2xl font-bold mb-9 text-gray-900">بەخێربێیت بۆ نۆرینگەی هێور</h1>

          <div className="w-3/4 text-center flex flex-col justify-center items-center">
            <h1 className="text-right w-3/4">ناوی بەکارهێنەر</h1>

            <input type="text" value={form.username} onChange={HandleInputChange} name="username"  className="w-3/4 h-[30px] rounded-sm bg-gray-300 mt-2" />

            <h1 className="text-right w-3/4 mt-2">ووشەی نهێنی</h1>

            <input type="text" value={form.password} onChange={HandleInputChange} name="password" className="w-3/4 h-[30px] rounded-sm bg-gray-300 mt-2" />

            <button onClick={handleLogin} className=" w-3/4 mt-4 cursor-pointer hover:bg-gray-800 font-bold bg-black text-white p-2 rounded-lg">چوونەژوورەوە</button>
          </div>
      </div>
    </div>
  );
}
