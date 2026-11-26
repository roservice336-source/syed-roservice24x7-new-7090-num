import React, { useState } from 'react';
import { User, Phone, MapPin, Wrench, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const LeadForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(event.currentTarget);
    
    // 👇 YAHAN APNI WEB3FORMS ACCESS KEY DAALEIN 👇
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); 

    // Formspree/Web3forms ke liye custom subject (optional)
    formData.append("subject", "New Doorstep Booking - RO Service 24x7");
    formData.append("from_name", "RO Service 24x7 Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        (event.target as HTMLFormElement).reset(); // Form clear kar dega
      } else {
        console.error("Error", data);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Error", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 max-w-md mx-auto relative z-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Book Service Now</h2>
        <p className="text-sm text-slate-500">
          Technician visit in <span className="bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-md">60-90 mins</span>
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        {/* FULL NAME */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your full name"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 bg-slate-50/50"
            />
          </div>
        </div>

        {/* MOBILE NUMBER */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <span className="absolute left-10 text-slate-600 font-medium">+91</span>
            <input
              type="tel"
              name="phone"
              required
              pattern="[0-9]{10}"
              maxLength={10}
              placeholder="10 digit mobile number"
              className="w-full pl-16 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 bg-slate-50/50"
            />
          </div>
        </div>

        {/* PINCODE */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">
            Bangalore Pincode <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              name="pincode"
              required
              pattern="[0-9]{6}"
              maxLength={6}
              placeholder="Enter 6 digit pincode"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 bg-slate-50/50"
            />
          </div>
        </div>

        {/* PURIFIER BRAND */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">
            Purifier Brand
          </label>
          <div className="relative">
            <select
              name="brand"
              required
              defaultValue=""
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 bg-slate-50/50 appearance-none"
            >
              <option value="" disabled>Select Brand</option>
              <option value="Kent">Kent</option>
              <option value="Aquaguard">Aquaguard</option>
              <option value="Pureit">Pureit</option>
              <option value="AO Smith">AO Smith</option>
              <option value="LG">LG</option>
              <option value="Other">Other</option>
            </select>
            {/* Custom Arrow for select */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* SERVICE REQUIRED */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">
            Service Required
          </label>
          <div className="relative flex items-center">
            <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
            <select
              name="service"
              required
              defaultValue="RO Water Purifier Service"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 bg-slate-50/50 appearance-none"
            >
              <option value="RO Water Purifier Service">RO Water Purifier Service</option>
              <option value="RO Installation">RO Installation</option>
              <option value="Filter Replacement">Filter Replacement</option>
              <option value="RO Repair">RO Repair</option>
              <option value="AMC Plan">AMC Plan</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON & STATUS MESSAGES */}
        {submitStatus === 'success' && (
          <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-2 text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            Booking successful! We will call you shortly.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-2 text-sm font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            Something went wrong. Please try calling us directly.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#00a86b] hover:bg-[#00915c] text-white font-bold text-lg py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Booking...
            </>
          ) : (
            <>
              Confirm Doorstep Booking
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
