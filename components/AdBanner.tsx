import React from 'react';

interface AdBannerProps {
  format?: 'horizontal' | 'rectangle' | 'vertical';
  label?: string;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ format = 'horizontal', label = 'Publicité', className = '' }) => {
  const getDimensions = () => {
    switch (format) {
      case 'rectangle': return 'h-[300px] w-full'; // Format Pavé (300x250 approx)
      case 'vertical': return 'h-[600px] w-full'; // Format Grand Angle
      case 'horizontal': default: return 'h-[120px] w-full'; // Format Bannière
    }
  };

  const contactNumber = "00237 672 05 12 89";
  const contactLink = "tel:00237672051289";

  return (
    <a
      href={contactLink}
      className={`block relative overflow-hidden group rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ${getDimensions()} ${className}`}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-slate-900 group-hover:bg-slate-800 transition-colors duration-500">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <span className="absolute top-2 right-2 text-[8px] uppercase tracking-widest text-white/30 z-20 border border-white/10 px-1 rounded">{label}</span>

      <div className="absolute inset-0 flex items-center justify-center p-4 z-10 text-center">
        {format === 'horizontal' ? (
          <div className="w-full overflow-hidden">
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
              }
              .animate-marquee {
                animation: marquee 20s linear infinite;
              }
            `}</style>
            <div className="animate-marquee whitespace-nowrap text-white font-serif text-xl md:text-2xl flex items-center gap-4">
              <span>Besoin d'un site web ?</span>
              <span className="text-secondary">•</span>
              <span>D'un logiciel ?</span>
              <span className="text-secondary">•</span>
              <span>D'une application mobile ?</span>
              <span className="bg-secondary text-primary px-4 py-1 rounded-full font-bold text-sm shadow-glow shrink-0">
                Contactez Wendooka Digital : {contactNumber}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in duration-700">
            <div className="space-y-2">
              <p className="text-white text-lg md:text-xl font-light">Besoin d'un <strong className="text-secondary font-bold">site web</strong> ?</p>
              <p className="text-white text-lg md:text-xl font-light">D'un <strong className="text-secondary font-bold">logiciel</strong> ?</p>
              <p className="text-white text-lg md:text-xl font-light">D'une <strong className="text-secondary font-bold">application mobile</strong> ?</p>
            </div>

            <div className="w-12 h-1 bg-white/20 rounded-full my-2"></div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-white/80 uppercase tracking-widest text-xs font-bold">Contactez</span>
              <h3 className="text-2xl md:text-3xl font-black text-white">Wendooka Digital</h3>
              <span className="bg-secondary text-primary px-6 py-2 rounded-full font-bold text-lg shadow-lg mt-2 group-hover:scale-105 transition-transform animate-pulse">
                {contactNumber}
              </span>
            </div>
          </div>
        )}
      </div>
    </a>
  );
};

export default AdBanner;