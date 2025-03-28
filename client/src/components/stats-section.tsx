export default function StatsSection() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text">10k+</div>
            <div className="mt-2 text-gray-600">Active Creators</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-[#3A1C71] via-[#D76D77] to-[#FFAF7B] text-transparent bg-clip-text">₹2.5Cr+</div>
            <div className="mt-2 text-gray-600">Monthly Earnings</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-[#00C6FF] to-[#0072FF] text-transparent bg-clip-text">500+</div>
            <div className="mt-2 text-gray-600">Brand Partners</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text">5M+</div>
            <div className="mt-2 text-gray-600">Audience Reach</div>
          </div>
        </div>
      </div>
    </section>
  );
}
