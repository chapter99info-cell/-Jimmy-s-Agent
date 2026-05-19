/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, Clock, Users, X, Send, Menu, Star, ChevronLeft, ChevronRight, Facebook } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// --- Constants & Data ---
const SERVICES = [
  { 
    duration: '30 MINS', 
    price: '$50', 
    types: 'HOT OIL | COCONUT OIL',
    description: 'Quick & focused relaxation',
    // 📷 30 นาที: แสดง "ภาพนิ่ง" อย่างเดียว
    image: 'https://firebasestorage.googleapis.com/v0/b/the-princess-thai-massage.firebasestorage.app/o/Photos%2FSlide%2FGemini_Generated_Image_%20(7).png?alt=media&token=f61e2848-7264-45a3-8dde-2f680d4cfa03'
  },
  { 
    duration: '45 MINS', 
    price: '$70', 
    types: 'HOT OIL | COCONUT OIL',
    description: 'Deep and continuous oil treatment',
    // ⬇️ 🎥 พี่แสนลบข้อความข้างล่างนี้ แล้ววางลิงก์วิดีโอของพี่ลงไปได้เลยครับ
    video: 'https://firebasestorage.googleapis.com/v0/b/the-princess-thai-massage.firebasestorage.app/o/VDo%2FMix02.mp4?alt=media&token=2f8032da-130a-40d8-a3f5-a8750cc8a581',
  
  },
  { 
    duration: '60 MINS', 
    price: '$80', 
    types: 'HOT OIL | COCONUT OIL',
    description: 'Premium full-body rejuvenation',
    // 📷 60 นาที: แสดง "ภาพนิ่ง" อย่างเดียว
    image: 'https://firebasestorage.googleapis.com/v0/b/the-princess-thai-massage.firebasestorage.app/o/Photos%2FGemini_Generated_Image_p38wuxp38wuxp38w.png?alt=media&token=35c13691-6301-4108-9fac-508cd169f854'
  },
  { 
    duration: '90 MINS', 
    price: '$130',
    types: 'HOT OIL | COCONUT OIL',
    description: 'Signature Deep Therapeutic Healing',
    // 🎥 90 นาที: แสดง "วิดีโอ" (และมีรูปหน้าปกรอระหว่างโหลด)
    video: 'https://firebasestorage.googleapis.com/v0/b/the-princess-thai-massage.firebasestorage.app/o/VDo%2F%E0%B8%A7%E0%B8%B4%E0%B8%94%E0%B8%B5%E0%B9%82%E0%B8%AD%E0%B8%99%E0%B8%A7%E0%B8%94%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A1%E0%B8%B1%E0%B8%99%E0%B8%AD%E0%B9%82%E0%B8%A3%E0%B8%A1%E0%B9%88%E0%B8%B2.mp4?alt=media&token=51770ab3-15c3-4e09-b612-64bb36b67bde',
  },
];

const REVIEWS = [
  { name: 'Sarah', text: "A truly wonderful experience. The atmosphere is so peaceful.", rating: 5 },
  { name: 'Emma', text: "The hot oil massage was exceptional. Highly recommended for seniors.", rating: 5 },
  { name: 'Mike', text: "Professional staff and very clean shop. Feeling completely rejuvenated.", rating: 5 },
];

const GALLERY_IMAGES = [
  // 1. Welcome to Our Sanctuary (รูปหินร้อน ดอกไม้ บรรยากาศผ่อนคลาย)
  'https://firebasestorage.googleapis.com/v0/b/the-princess-thai-massage.firebasestorage.app/o/Photos%2FGemini_Generated_Image_jjyw4djjyw4djjyw.png?alt=media&token=3874f76b-3136-4f54-b82c-f8544295a619',
  
  // 2. The Princess Thai Experience (รูปการนวดน้ำมันระดับพรีเมียม)
  'https://firebasestorage.googleapis.com/v0/b/the-princess-thai-massage.firebasestorage.app/o/Photos%2FGemini_Generated_Image_57v0bp57v0bp57v0.png?alt=media&token=43ce17fd-7bc0-42d2-a138-564fc51379d9',
  
  // 3. Professional Healing Space (รูปน้ำมันอโรม่าและเทียนหอมในห้องนวด)
  'https://firebasestorage.googleapis.com/v0/b/the-princess-thai-massage.firebasestorage.app/o/Photos%2FGemini_Generated_Image_i6lwnyi6lwnyi6lw.png?alt=media&token=d92412b1-22fd-4078-a69c-785727c3a211',
  
  // 4. Serene Treatment Rooms (รูปเตียงนวดไทยและการเซตอัปห้องที่สวยงาม)
  'https://firebasestorage.googleapis.com/v0/b/the-princess-thai-massage.firebasestorage.app/o/Photos%2FSlide%2FGemini_Generated_Image_%20(9).png?alt=media&token=554cd51b-e661-46c0-be35-7cb981a4b020',
  
  // 5. Elegant Hallways of Peace (รูปเบาะพักผ่อนและผ้าขนหนูสไตล์โรงแรม 5 ดาว)
  'https://firebasestorage.googleapis.com/v0/b/the-princess-thai-massage.firebasestorage.app/o/Photos%2FSlide%2FGemini_Generated_Image_%20(8).png?alt=media&token=ceb8472b-745f-4f8f-8cd4-659e11bcd7d4'
];

const GALLERY_TITLES = [
  "Welcome to Our Sanctuary",
  "The Princess Thai Experience",
  "Professional Healing Space",
  "Serene Treatment Rooms",
  "Elegant Hallways of Peace"
];

const SYSTEM_INSTRUCTION = `
👑 System Instruction: The Princess Thai Massage (Bilingual Expert)
Role: You are "Princess AI", the elegant and welcoming Digital Receptionist for The Princess Thai Massage in Riverwood. You represent a Minimal Luxury brand.

1. Language Handling (CRITICAL):
• You must understand and reply in the language the customer uses. 
• If the customer asks in Thai (e.g., "ราคาแพกวันนี้", "มีนวดอะไรบ้าง", "ราคาเท่าไหร่"), you MUST reply in polite Thai using "ค่ะ/นะคะ".

2. Service Menu & Pricing (Strict List):
• 30 Mins: $50 (Quick & focused relaxation)
• 45 Mins: $70 (Deep and continuous oil treatment)
• 60 Mins: $80 (Premium full-body rejuvenation)
• 90 Mins: $130 (Signature Deep Therapeutic Healing)
*Note: We specialize in Hot Oil and Coconut Oil Massage performed by professional female therapists only.*

[Example Thai Response for Prices]:
"สวัสดีค่ะ ยินดีต้อนรับสู่ คอร์สนวดพรีเมียมของ The Princess Thai Massage ค่ะ ราคาแพ็กเกจของเรามีดังนี้นะคะ:
• 30 นาที — $50
• 45 นาที — $70
• 60 นาที — $80
• 90 นาที — $130 (คอร์สแนะนำเพื่อการผ่อนคลายขั้นสุด)
สนใจจองคิวโทรหาเราได้ที่เบอร์ 0427 139 455 ได้เลยค่ะ ✨"

3. Contact & Operations:
• Phone: 0427 139 455 (Always direct customers to call this number for bookings. We do not take bookings via chat).
• Hours: 10:00 AM – 08:30 PM (Open 7 Days).

4. Location & Navigation (Anti-Residential Guide):
• Address: 186-202 Belmore Rd, Riverwood NSW 2210.
• Note: Located on the main road commercial block (Formerly known as Angel's Touch location, but now fully renovated under new ownership and management).
• Guideline: Tell customers to stay on Belmore Road, look for our store sign, and DO NOT enter residential side streets.

5. Tone & Call to Action:
• Keep it luxury, warm, and polite. Always end the chat by inviting them to call 0427 139 455 to secure their spot.

6. Reviews & Testimonials (CRITICAL):
• If a customer expresses satisfaction, praise (e.g., "ประทับใจมาก", "นวดดีมาก", "Good job", "Impressed"), or asks how to leave a review/rating, you MUST reply with this exact format:

**ขอบคุณมากๆ สำหรับความไว้วางใจค่ะ หากประทับใจในบริการ สามารถช่วยรีวิวเป็นกำลังใจให้พวกเราได้นะคะ:**

---

[👉 เขียนรีวิวบน Google Maps ⭐⭐⭐⭐⭐](https://share.google/qEmNBor0UTtoiz8LL)

---

[👉 เข้าชมและรีวิวบน Facebook Page 📘](https://www.facebook.com/profile.php?id=61590124252569)

---

• IMPORTANT: NEVER send raw URLs (https://...). Always use the Markdown link format above.
`;

const PRIVACY_POLICY = `
The Princess Thai Massage
Last Updated: May 2026

At The Princess Thai Massage, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information in accordance with the Australian Privacy Principles (APPs) contained in the Privacy Act 1988 (Cth).

1. Information We Collect
To provide you with high-quality massage therapy and care, we may collect personal and health-related information, including:
- Contact Information: Your name, phone number, email address, and residential address.
- Health & Medical History: Current physical conditions, past injuries, allergies, pregnancy status, or medical treatments relevant to safe massage therapy.
- Transaction Details: Booking history, preferences, and payment information (processed via secure, compliant payment gateways).

2. How We Collect Your Information
We collect your information directly from you through various channels, including:
- Online booking forms on our official website.
- Physical or digital intake/consultation forms completed prior to your session.
- Phone calls, text messages, emails, or direct conversations at our clinic.

3. How We Use Your Information
Your information is used strictly to ensure a safe and tailored service, specifically for:
- Assessing and designing safe massage treatment plans tailored to your health needs.
- Managing your appointments, sending reminders, and processing payments.
- Communicating important operational changes or responding to your inquiries.
- With your explicit consent, sending promotional offers, loyalty rewards, or newsletters. You may opt out of marketing at any time.

4. Disclosure of Your Information
We respect your confidentiality. We will never sell, lease, or rent your personal data. Your information is only disclosed to third parties under the following limited conditions:
- To trusted software providers supporting our operations (e.g., booking and billing systems) under strict confidentiality agreements.
- When required or authorized by Australian law (e.g., to comply with a court order or public health directive).

5. Data Security and Retention
We implement a variety of administrative and technical security measures to maintain the safety of your personal information. Digital data is stored securely using password-protected systems, and physical forms are stored securely with restricted access. We retain health records for the duration required by Australian healthcare and business compliance regulations.

6. Accessing and Correcting Your Information
You have the right to request access to the personal data we hold about you and to ask for updates or corrections if any details are inaccurate. To make a request, please contact our privacy manager using the details below.

7. Cookies and Website Tracking
Our website utilizes cookies to improve user experience, monitor traffic patterns, and optimize booking functionality. You can choose to disable cookies via your browser settings, though it may impact certain features of the website.

8. Contact Us
If you have any questions, concerns, or complaints regarding this Privacy Policy or how we handle your data, please reach out to us at:

The Princess Thai Massage
Address: 186 Belmore Rd, Riverwood NSW 2210
Phone: (02) 8502 8564
`;

const TERMS_OF_SERVICE = `
The Princess Thai Massage
Last Updated: May 2026

Welcome to The Princess Thai Massage. This website and its booking services are owned and operated by The Princess Thai Massage. By accessing our website, making an online booking, or purchasing our services, you agree to comply with and be bound by the following Terms of Service.

1. General Conditions
We reserve the right to refuse service to anyone for any reason at any time. All credit card and payment processing data is strictly encrypted and handled through secure third-party payment gateways.

2. Online Bookings and Appointments
To ensure a seamless booking experience through our web application, please note the following:
- Accuracy: You must provide accurate, current, and complete personal and contact details when making a booking.
- Confirmation: A booking request is only fully confirmed once you receive a confirmation notification via email, SMS, or through the application interface.

3. Cancellation and Rescheduling Policy
We value the time of both our clients and our therapists. To manage appointments fairly, we enforce the following policy:
- Any cancellation or rescheduling must be requested at least 24 hours prior to the scheduled appointment time.
- Late cancellations (less than 24 hours notice) or failure to show up for your scheduled session ("No-Show") may incur a cancellation fee up to the full value of the booked service, or forfeiture of any deposit paid.

4. Client Health and Responsibilities
Your health and safety are our top priorities. By booking a treatment with us, you agree to:
- Disclose all relevant health conditions, allergies, injuries, medical history, or pregnancy status prior to your massage session.
- Understand that massage therapy is for relaxation and muscular therapeutic purposes and is not a substitute for professional medical treatment or diagnosis.
- Immediately notify your therapist if you experience pain, discomfort, or dizziness during your session.

5. Conduct and Right to Terminate
The Princess Thai Massage maintains a strictly professional, safe, and respectful environment. Any form of illicit, inappropriate, or sexual remarks, behavior, or advances will result in the immediate termination of the session without a refund. The client will be banned from future bookings, and local law enforcement will be notified immediately.

6. Pricing and Payments
All prices listed on our website and booking application are displayed in Australian Dollars (AUD) and are subject to change without notice. Payments must be completed at the time of online booking (if required) or immediately following the service at the clinic.

7. Limitation of Liability
To the maximum extent permitted by New South Wales (NSW) and Australian Consumer Law, The Princess Thai Massage shall not be liable for any injuries or damages resulting from non-disclosure of medical conditions or misuse of our services.

8. Governing Law
These Terms of Service and any services provided shall be governed by and construed in accordance with the laws of New South Wales, Australia.

9. Contact Information
If you have any questions about these Terms of Service, please contact us at 186 Belmore Rd, Riverwood NSW 2210.
`;

// --- Components ---

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hello! I am Princess AI. How may I assist you with our massage treatments today?' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg,
          systemInstruction: SYSTEM_INSTRUCTION
        }),
      });
      
      const data = await resp.json();
      
      if (data.error) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: 'ai', text: data.text || 'I apologize, I am experiencing a connection issue. Please call us at 0427 139 455.' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { role: 'ai', text: 'I apologize, something went wrong. Please call us at 0427 139 455 for immediate assistance.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const startLongPress = () => {
    longPressTimer.current = setTimeout(() => {
      setIsHidden(true);
      setIsOpen(false);
    }, 2000);
  };

  const endLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  // 🛠️ ฟังก์ชันพิเศษของพี่แสน: แปลงร่างข้อความ Markdown ให้กลายเป็นปุ่มกดดีไซน์ทันสมัยพรีเมียม
  const parseMessageContent = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const lines = text.split('\n');

    return lines.map((line, index) => {
      // 1. ตรวจสอบว่าเป็นลิงก์ปุ่มรีวิวไหม
      const match = [...line.matchAll(linkRegex)];
      if (match.length > 0) {
        const [_, buttonText, url] = match[0];
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-white text-[#2d1b40] border-2 border-[#9c77b7] px-5 py-3.5 my-3 rounded-2xl font-bold text-[18px] shadow-sm hover:bg-[#2d1b40] hover:text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 duration-200"
          >
            {buttonText}
          </a>
        );
      }

      // 2. แปลงตัวหนา **ข้อความ**
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-bold text-[#2d1b40] mb-2">{line.replace(/\*\*/g, '')}</p>;
      }

      // 3. แปลงเส้นคั่น ---
      if (line.trim() === '---') {
        return <hr key={index} className="my-3 border-neutral-100" />;
      }

      // 4. บรรทัดข้อความปกติ
      return line.trim() ? <p key={index} className="mb-1.5">{line}</p> : <div key={index} className="h-2" />;
    });
  };

  if (isHidden) return null;

  return (
    <motion.div 
      drag
      dragMomentum={false}
      className="fixed bottom-6 right-6 z-50 font-sans touch-none"
      style={{ x: 0, y: 0 }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-24 right-0 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-[#9c77b7]/10 overflow-hidden flex flex-col h-[550px]"
          >
            {/* Header */}
            <div className="bg-[#2d1b40] p-6 flex items-center justify-between text-white flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                  <img 
                    src="https://firebasestorage.googleapis.com/v0/b/the-princess-thai-massage.firebasestorage.app/o/Photos%2FGemini_Generated_Image_jafsbejafsbejafs.png?alt=media&token=93b44e20-37b3-4890-a8ad-538c64418577" 
                    className="w-full h-full object-cover"
                    alt="Princess AI"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-xl leading-none">Princess AI</h3>
                  <span className="text-[14px] opacity-70 tracking-widest uppercase">Digital Receptionist</span>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }} 
                className="hover:rotate-90 transition-transform duration-300"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fffcfb] cursor-default" onPointerDown={e => e.stopPropagation()}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-5 py-3 rounded-2xl text-[19px] leading-relaxed shadow-sm ${
                      m.role === 'user' ? 'bg-[#9c77b7] text-white rounded-br-none' : 'bg-white text-neutral-800 rounded-tl-none border border-neutral-100'
                    }`}
                  >
                    {/* 🔄 จุดเปลี่ยนชีวิตของพี่แสน: เรียกใช้ฟังก์ชันแปลงร่างข้อความแทนตัวหนังสือดิบ */}
                    {parseMessageContent(m.text)}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-neutral-100 px-5 py-3 rounded-2xl rounded-tl-none flex gap-2">
                    <span className="w-2 h-2 bg-[#9c77b7]/40 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-[#9c77b7]/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-[#9c77b7]/80 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-neutral-100 flex-shrink-0" onPointerDown={e => e.stopPropagation()}>
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your question here..."
                  className="w-full pl-6 pr-14 py-4 bg-neutral-50 rounded-2xl text-[18px] border-none focus:ring-2 focus:ring-[#9c77b7] transition-all"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); handleSend(); }}
                  className="absolute right-2 top-2 p-2 text-[#9c77b7] hover:bg-[#9c77b7]/10 rounded-xl transition"
                >
                  <Send size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onPointerDown={startLongPress}
        onPointerUp={endLongPress}
        onPointerLeave={endLongPress}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          if (!isDragging.current) {
            setIsOpen(!isOpen);
          }
        }}
        onDragStart={() => {
          isDragging.current = true;
          endLongPress();
        }}
        onDragEnd={() => {
          setTimeout(() => { isDragging.current = false; }, 50);
        }}
        className="w-20 h-20 bg-[#9c77b7] text-white rounded-full shadow-2xl flex flex-col items-center justify-center border-4 border-white overflow-hidden relative group cursor-grab active:cursor-grabbing"
      >
        <img 
          src="https://firebasestorage.googleapis.com/v0/b/the-princess-thai-massage.firebasestorage.app/o/Photos%2FGemini_Generated_Image_jafsbejafsbejafs.png?alt=media&token=93b44e20-37b3-4890-a8ad-538c64418577"
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
          alt="Chat AI"
        />
        <motion.div
           animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
           transition={{ duration: 2, repeat: Infinity }}
           className="absolute inset-0 bg-white rounded-full pointer-events-none"
        />
      </motion.button>
    </motion.div>
  );
}

export default function App() {
  const [activePlanIdx, setActivePlanIdx] = useState(0);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="min-h-screen bg-[#fffbff] text-[#2d1b40] font-sans selection:bg-[#9c77b7]/20 text-[20px] md:text-[22px] relative">
      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#2d1b40]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl max-h-[80vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-8 border-b border-neutral-100 flex items-center justify-between bg-[#f5effa]">
                <div>
                  <h3 className="text-2xl font-serif text-[#2d1b40]">Privacy Policy</h3>
                  <p className="text-sm text-[#9c77b7] font-bold uppercase tracking-widest mt-1">Legal & Data Protection</p>
                </div>
                <button 
                  onClick={() => setShowPrivacy(false)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2d1b40] hover:bg-[#9c77b7] hover:text-white transition shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-6 text-[17px] leading-relaxed text-neutral-600">
                {PRIVACY_POLICY.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <div className="p-8 bg-neutral-50 border-t border-neutral-100 flex justify-end">
                <button 
                  onClick={() => setShowPrivacy(false)}
                  className="px-8 py-3 bg-[#9c77b7] text-white rounded-full font-bold hover:bg-[#8659a3] transition shadow-md"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Terms of Service Modal */}
      <AnimatePresence>
        {showTerms && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#2d1b40]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl max-h-[80vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-8 border-b border-neutral-100 flex items-center justify-between bg-[#f5effa]">
                <div>
                  <h3 className="text-2xl font-serif text-[#2d1b40]">Terms of Service</h3>
                  <p className="text-sm text-[#9c77b7] font-bold uppercase tracking-widest mt-1">Usage & Conduct</p>
                </div>
                <button 
                  onClick={() => setShowTerms(false)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2d1b40] hover:bg-[#9c77b7] hover:text-white transition shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-6 text-[17px] leading-relaxed text-neutral-600">
                {TERMS_OF_SERVICE.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <div className="p-8 bg-neutral-50 border-t border-neutral-100 flex justify-end">
                <button 
                  onClick={() => setShowTerms(false)}
                  className="px-8 py-3 bg-[#9c77b7] text-white rounded-full font-bold hover:bg-[#8659a3] transition shadow-md"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Fixed Background Atmospheric Orchids */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          src="638828556330000000_be960625-53b9-41a1-b99f-d2e4b80c2987_9.png"
          className="absolute -top-40 -right-40 w-[800px] md:w-[1200px] rotate-[-15deg] grayscale-[0.2]"
          alt=""
        />
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          src="638828556330000000_be960625-53b9-41a1-b99f-d2e4b80c2987_9.png"
          className="absolute top-[40%] -left-60 w-[700px] md:w-[1000px] rotate-[165deg] grayscale-[0.2]"
          alt=""
        />
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          src="638828556330000000_be960625-53b9-41a1-b99f-d2e4b80c2987_9.png"
          className="absolute -bottom-40 -right-40 w-[800px] md:w-[1200px] rotate-[195deg] grayscale-[0.2]"
          alt=""
        />
      </div>

      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-100">
        <nav className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌸</span>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-[0.3em] uppercase text-[#9c77b7]">The Princess</span>
              <span className="text-lg font-serif italic tracking-wide">Thai Massage</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[16px] font-bold tracking-[0.2em] uppercase">
            <a href="#" className="hover:text-[#9c77b7] transition">Home</a>
            <a href="#services" className="hover:text-[#9c77b7] transition">Services</a>
            <a href="#gallery" className="hover:text-[#9c77b7] transition">Gallery</a>
            <a href="#contact" className="hover:text-[#9c77b7] transition">Contact</a>
            <a
               href="tel:0427139455"
               className="bg-[#9c77b7] text-white px-10 py-5 rounded-full hover:bg-[#8659a3] transition shadow-lg text-lg flex items-center gap-2"
            >
              <Phone size={24} />
              Call 0427 139 455
            </a>
          </div>
          <button className="md:hidden p-2 text-[#9c77b7]">
            <Menu size={32} />
          </button>
        </nav>
      </header>

      <main className="pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[650px] flex items-center overflow-hidden bg-[#f5effa]">
          <div className="absolute inset-0">
            {/* Video Background */}
            <div className="absolute right-0 bottom-0 top-0 w-full md:w-3/4 opacity-30 md:opacity-100 pointer-events-none">
                <video 
                    src="https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/chapter99%20studio%2FChapter99%20Solution%2FVDO%2FCinematic_video_of_a_luxurious.mp4?alt=media&token=b38746e6-cfc2-4dfc-9317-192bbb021503"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover object-center"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#f5effa] via-[#f5effa]/90 to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="max-w-2xl"
            >
              <h2 className="text-6xl md:text-9xl font-serif leading-[1.1] mb-8 text-[#2d1b40]">
                Authentic Thai <br />
                <span className="text-[#9c77b7] italic">Relaxation</span> <br />
                <span className="font-light">Riverwood.</span>
              </h2>
              <p className="text-2xl md:text-3xl text-neutral-600 font-light mb-12 tracking-wide font-serif italic">
                Experience the ultimate comfort with our Hot Oil and Coconut Oil treatments.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="tel:0427139455" className="bg-[#9c77b7] text-white px-12 py-6 rounded-full text-xl font-bold shadow-xl hover:bg-[#8659a3] transition flex items-center justify-center gap-3">
                  <Phone size={28} />
                  CALL 0427 139 455
                </a>
                <a href="#services" className="bg-white/80 backdrop-blur-sm text-[#9c77b7] border-2 border-[#9c77b7]/20 px-12 py-6 rounded-full text-xl font-bold shadow-lg hover:bg-white transition flex items-center justify-center">
                  Explore Menu
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section with Image Slider */}
        <section id="services" className="py-32 bg-white relative overflow-hidden">
          {/* Decorative Blooming Orchids */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            whileInView={{ opacity: 0.15, scale: 1, rotate: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute -top-10 -left-10 text-[200px] pointer-events-none select-none"
          >
            🌸
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
            whileInView={{ opacity: 0.1, scale: 1.1, rotate: 0 }}
            transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
            className="absolute bottom-20 right-10 text-[150px] pointer-events-none select-none"
          >
            🌺
          </motion.div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <div className="sticky top-40">
                 <div className="relative">
                    <AnimatePresence mode="wait">
                      {SERVICES[activePlanIdx].video ? (
                        <motion.video
                          key={`srv-v-${activePlanIdx}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          src={SERVICES[activePlanIdx].video}
                          poster={SERVICES[activePlanIdx].image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="rounded-[80px] shadow-[0_40px_100px_-20px_rgba(156,119,183,0.25)] relative z-10 w-full aspect-[4/5] object-cover"
                        />
                      ) : (
                        <motion.img 
                            key={`srv-i-${activePlanIdx}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            src={SERVICES[activePlanIdx].image} 
                            alt="Treatment Level" 
                            className="rounded-[80px] shadow-[0_40px_100px_-20px_rgba(156,119,183,0.25)] relative z-10 w-full aspect-[4/5] object-cover"
                            referrerPolicy="no-referrer"
                        />
                      )}
                    </AnimatePresence>
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#f5effa] rounded-full -z-0" />
                 </div>
                 
                 <div className="mt-16 grid grid-cols-3 gap-8">
                    <div className="text-center">
                        <span className="text-4xl font-serif text-[#9c77b7]">4.9</span>
                        <div className="flex justify-center text-amber-400 mt-1"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                        <p className="text-xs uppercase font-bold tracking-widest mt-2 opacity-60">Avg Rating</p>
                    </div>
                    <div className="text-center border-x border-neutral-100">
                        <span className="text-4xl font-serif text-[#9c77b7]">7</span>
                        <p className="text-xs uppercase font-bold tracking-widest mt-2 opacity-60 pt-4">Days Open</p>
                    </div>
                    <div className="text-center">
                        <span className="text-4xl font-serif text-[#9c77b7]">100%</span>
                        <p className="text-xs uppercase font-bold tracking-widest mt-2 opacity-60 pt-4">Satisfaction</p>
                    </div>
                 </div>
              </div>

              <div className="space-y-16">
                <div className="space-y-6">
                    <span className="text-[#9c77b7] text-base font-bold uppercase tracking-[0.4em]">Premium Treatments</span>
                    <h3 className="text-5xl md:text-7xl font-serif text-[#2d1b40] leading-tight">Nourish Your Body <br />& <span className="italic text-[#9c77b7]">Mind</span></h3>
                    <p className="text-neutral-500 max-w-lg text-xl">Experience the art of relaxation through our specialized treatments, performed by professional female therapists dedicated to your wellbeing.</p>
                </div>

                <div className="space-y-8">
                  {SERVICES.map((s, i) => (
                    <motion.div
                      key={i}
                      onMouseEnter={() => setActivePlanIdx(i)}
                      className={`group flex items-center justify-between p-8 md:p-10 rounded-[50px] border-2 transition-all cursor-pointer ${
                         activePlanIdx === i 
                         ? 'bg-white border-[#9c77b7]/30 shadow-2xl scale-[1.02]' 
                         : 'bg-[#fdfbff] border-transparent grayscale-[0.5] opacity-80'
                      }`}
                    >
                      <div className="flex items-center gap-8">
                         <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                             activePlanIdx === i ? 'bg-[#9c77b7] text-white' : 'bg-white text-[#9c77b7] shadow-sm'
                         }`}>
                            <Clock size={28} />
                         </div>
                         <div>
                            <h4 className="text-[30px] md:text-[34px] font-serif font-bold text-[#2d1b40] mb-1">
                                {s.duration} — <span className="text-[#9c77b7] text-[42px] md:text-[48px] ml-2">{s.price}</span>
                            </h4>
                            <p className="text-[19px] text-[#9c77b7]/70 font-medium mb-1">{s.description}</p>
                            <p className="text-base uppercase tracking-[0.2em] text-neutral-400 font-bold">{s.types}</p>
                         </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sanctuary Gallery Section (Carousel) */}
        <section id="gallery" className="py-32 bg-white relative overflow-hidden">
          {/* Decorative Floating Orchids */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                y: Math.random() * 500, 
                x: i % 2 === 0 ? -100 : 100,
                rotate: Math.random() * 360 
              }}
              animate={{ 
                opacity: [0, 0.1, 0],
                y: [null, Math.random() * -500],
                x: [null, i % 2 === 0 ? 50 : -50],
                rotate: [null, Math.random() * 360 + 180]
              }}
              transition={{ 
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear"
              }}
              className="absolute text-[120px] pointer-events-none select-none z-0"
              style={{
                left: `${Math.random() * 100}%`,
              }}
            >
              {i % 2 === 0 ? '🌸' : '🌺'}
            </motion.div>
          ))}

          {/* Large Static Decorative Orchids */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 3 }}
            className="absolute top-20 right-[-2%] text-[280px] pointer-events-none select-none"
          >
            🌸
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 3, delay: 0.5 }}
            className="absolute bottom-20 left-[-2%] text-[240px] pointer-events-none select-none"
          >
            🌺
          </motion.div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16 space-y-6">
                <span className="text-[#9c77b7] text-base font-bold uppercase tracking-[0.4em]">The Sanctuary Gallery</span>
                <h3 className="text-4xl md:text-7xl font-serif text-[#2d1b40]">A Journey of <span className="italic text-[#9c77b7]">Serenity</span></h3>
                <p className="text-neutral-500 max-w-2xl mx-auto text-xl leading-relaxed">Browse through our sanctuary of peace, designed to provide the highest standards of Thai hospitality and clinical cleanliness.</p>
            </div>

            <div className="relative group">
                <div className="overflow-hidden rounded-[80px] shadow-[0_50px_100px_-20px_rgba(45,27,64,0.15)] bg-[#f5effa]">
                    <div className="relative h-[400px] md:h-[700px] w-full">
                        <AnimatePresence mode="wait">
                            {GALLERY_IMAGES[activeGalleryIdx].toLowerCase().includes('.mp4') ? (
                              <motion.video
                                key={`gal-v-${activeGalleryIdx}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                src={GALLERY_IMAGES[activeGalleryIdx]}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                              />
                            ) : (
                                <motion.img
                                    key={`gal-i-${activeGalleryIdx}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    src={GALLERY_IMAGES[activeGalleryIdx]}
                                    alt="Gallery Sanctuary"
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            )}
                        </AnimatePresence>
                        
                        {/* Overlay Content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b40]/60 via-transparent to-transparent pointer-events-none" />
                        <motion.div 
                            key={`text-${activeGalleryIdx}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-12 md:bottom-20 left-12 md:left-24 text-white"
                        >
                            <span className="text-[#9c77b7] font-bold uppercase tracking-[0.3em] text-sm md:text-base mb-2 block">Premium Experience</span>
                            <h4 className="text-3xl md:text-5xl font-serif leading-tight">{GALLERY_TITLES[activeGalleryIdx].split(' ').slice(0, -1).join(' ')} <br /><span className="italic">{GALLERY_TITLES[activeGalleryIdx].split(' ').slice(-1)}</span></h4>
                        </motion.div>
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="absolute inset-y-0 -left-4 md:-left-12 flex items-center">
                    <button 
                        onClick={() => setActiveGalleryIdx((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)}
                        className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-full shadow-2xl flex items-center justify-center text-[#2d1b40] hover:bg-[#9c77b7] hover:text-white transition-all transform hover:scale-110 active:scale-95 border-4 border-[#fdfbff]"
                    >
                        <ChevronLeft size={32} />
                    </button>
                </div>
                <div className="absolute inset-y-0 -right-4 md:-right-12 flex items-center">
                    <button 
                        onClick={() => setActiveGalleryIdx((prev) => (prev + 1) % GALLERY_IMAGES.length)}
                        className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-full shadow-2xl flex items-center justify-center text-[#2d1b40] hover:bg-[#9c77b7] hover:text-white transition-all transform hover:scale-110 active:scale-95 border-4 border-[#fdfbff]"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center gap-4 mt-12">
                    {GALLERY_IMAGES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveGalleryIdx(i)}
                            className={`h-2 transition-all duration-500 rounded-full ${
                                activeGalleryIdx === i ? 'w-12 bg-[#9c77b7]' : 'w-2 bg-[#9c77b7]/20 hover:bg-[#9c77b7]/40'
                            }`}
                        />
                    ))}
                </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-32 bg-[#faf7fd] relative overflow-hidden">
            {/* Orchid Overlays */}
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 0.05 }}
               className="absolute top-10 left-10 text-[180px] pointer-events-none"
            >
              🌸
            </motion.div>
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 0.05 }}
               className="absolute bottom-10 right-10 text-[180px] pointer-events-none"
            >
              🌺
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-100 text-amber-700 text-sm font-bold uppercase tracking-widest mb-4">
                        <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                        Verified Google Reviews
                    </div>
                    <h3 className="text-4xl md:text-6xl font-serif text-[#2d1b40]">Client Testimonials</h3>
                    <div className="flex justify-center text-amber-400 gap-2">
                        <Star size={32} fill="currentColor" /> <Star size={32} fill="currentColor" /> <Star size={32} fill="currentColor" /> <Star size={32} fill="currentColor" /> <Star size={32} fill="currentColor" />
                    </div>
                    <p className="text-lg md:text-xl font-serif italic text-neutral-400">"Exceptional care for body and mind, rated 4.9 stars by our local community."</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {REVIEWS.map((r, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-10 rounded-[50px] shadow-sm border border-neutral-100 flex flex-col hover:shadow-xl transition-all group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex text-amber-400">
                                        {[...Array(r.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                                    </div>
                                    <div className="flex items-center gap-1 text-[12px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full uppercase">
                                        <div className="w-1 h-1 bg-amber-600 rounded-full" />
                                        Verified
                                    </div>
                                </div>
                                <p className="text-2xl text-neutral-700 mb-8 font-serif leading-relaxed italic group-hover:text-[#2d1b40] transition-colors">"{r.text}"</p>
                                <div className="mt-auto flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#f5effa] flex items-center justify-center text-[#9c77b7] font-bold text-base">
                                        {r.name.charAt(0)}
                                    </div>
                                    <span className="text-base uppercase font-bold tracking-[0.2em] text-[#2d1b40]">— {r.name}</span>
                                </div>
                            </motion.div>
                        ))}
                        {/* Summary Card */}
                        <motion.a 
                            href="https://share.google/MVWmjKvUqvx5tBFRY"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-[#2d1b40] p-10 rounded-[50px] text-white flex flex-col justify-center items-center text-center space-y-6 shadow-xl transition-shadow cursor-pointer block"
                        >
                            <div className="w-16 h-16 bg-[#9c77b7] rounded-full flex items-center justify-center text-2xl">⭐</div>
                            <div>
                                <h4 className="text-3xl font-serif mb-2">4.9 / 5.0</h4>
                                <p className="text-white/60 text-sm uppercase tracking-widest font-bold">Google Rating</p>
                            </div>
                            <p className="text-sm text-white/40 italic">Based on latest community feedback from Riverwood locals.</p>
                        </motion.a>
                    </div>
                    
                    <div className="lg:w-1/3 w-full h-[400px] lg:h-[600px] rounded-[60px] overflow-hidden shadow-2xl relative">
                        <video 
                            src="https://firebasestorage.googleapis.com/v0/b/the-princess-thai-massage.firebasestorage.app/o/VDo%2Fa_be_ccf_b_da_c_e_f_ed_e_e_f_bb_f_f_c_c_mp_.mp4?alt=media&token=afb53eb8-48e4-4052-ba8a-4d4b4b88d833" 
                            className="w-full h-full object-cover" 
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b40]/80 via-transparent to-transparent" />
                        <div className="absolute bottom-10 left-10 right-10 text-white">
                            <span className="text-[#9c77b7] font-bold uppercase tracking-[0.3em] text-xs mb-2 block">Our Atmosphere</span>
                            <p className="text-2xl font-serif leading-tight">A sanctuary of peace designed for your rejuvenation.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-[#2d1b40] rounded-[80px] overflow-hidden flex flex-col lg:flex-row shadow-2xl border-4 border-white">
                    <div className="lg:w-1/2 p-12 md:p-24 space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-5xl md:text-7xl font-serif text-white whitespace-nowrap">Ready to <br /><span className="text-[#9c77b7] italic">Book Your</span> Session?</h3>
                            <p className="text-white/60 text-xl">Please call us directly to check immediate availability. We do not accept bookings via chat.</p>
                        </div>
                        
                        <div className="space-y-8">
                            <a href="tel:0427139455" className="flex items-center gap-8 group">
                                <div className="w-20 h-20 rounded-full bg-[#9c77b7] flex items-center justify-center text-white group-hover:scale-110 transition shadow-lg">
                                    <Phone size={32} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-4xl md:text-6xl font-bold text-white block mb-1 leading-none">0427 139 455</span>
                                    <span className="text-base uppercase tracking-widest text-[#9c77b7] font-bold mt-2">Call to book anytime</span>
                                </div>
                            </a>
                            
                            <div className="flex items-center gap-8">
                                <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center text-[#9c77b7]">
                                    <Clock size={32} />
                                </div>
                                <div className="text-white">
                                    <span className="text-xl block">Open Every Day</span>
                                    <span className="text-base text-white/50">10:00 AM — 08:30 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:w-1/2 min-h-[400px] relative">
                         <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d827.3841208061432!2d151.05144126959684!3d-33.95304789832466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b935c4faf1d7%3A0x4c5e825650c1d8d!2s186-202%20Belmore%20Rd%2C%20Riverwood%20NSW%202210!5e0!3m2!1sen!2sau!4v1778845399854!5m2!1sen!2sau" 
                            className="w-full h-full border-none pointer-events-none lg:pointer-events-auto"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        <div className="absolute top-10 left-10 right-10 bg-white/95 backdrop-blur p-8 rounded-3xl shadow-2xl">
                             <h4 className="text-[#9c77b7] font-bold uppercase tracking-[0.2em] mb-2">Our Location</h4>
                             <a 
                                href="https://www.google.com/maps/search/?api=1&query=186-202+Belmore+Rd,+Riverwood+NSW+2210"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#2d1b40] font-medium mb-1 hover:text-[#9c77b7] transition-colors block"
                             >
                                186-202 Belmore Rd, Riverwood NSW 2210
                             </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <footer className="py-20 border-t border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
            <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">🌸</span>
                <span className="text-2xl font-serif italic text-[#2d1b40]">The Princess Thai Massage</span>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center gap-6">
                <motion.a
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://www.facebook.com/profile.php?id=61590124252569"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center text-[#9c77b7] hover:bg-[#9c77b7] hover:text-white transition shadow-sm"
                >
                    <Facebook size={24} />
                </motion.a>
                <motion.a
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://share.google/MVWmjKvUqvx5tBFRY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center text-[#9c77b7] hover:bg-[#9c77b7] hover:text-white transition shadow-sm"
                >
                    <Star size={24} />
                </motion.a>
            </div>

            <p className="text-base text-neutral-400 uppercase tracking-widest">&copy; 2026 The Princess Thai Massage Riverwood. All rights reserved.</p>
            <div className="flex justify-center gap-10 text-sm uppercase tracking-[0.3em] text-[#9c77b7] font-bold">
                <button onClick={() => setShowPrivacy(true)} className="hover:opacity-70 transition cursor-pointer">Privacy Policy</button>
                <button onClick={() => setShowTerms(true)} className="hover:opacity-70 transition cursor-pointer">Terms of Service</button>
            </div>
        </div>
      </footer>

      <ChatBot />

      {/* Floating Call Button for Mobile */}
      <div className="md:hidden fixed bottom-28 right-6 z-40">
        <motion.a
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          href="tel:0427139455"
          className="w-16 h-16 bg-[#9c77b7] text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white"
        >
          <Phone size={28} />
        </motion.a>
      </div>
    </div>
  );
}
