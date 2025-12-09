import React from 'react';

const Reviews = () => {
  return (
    <div className="w-full py-8 md:py-12 px-4 md:px-6 lg:px-8">
      <style>{`
        .uc-iframe {
          height: 800px !important;
        }
        @media (max-width: 798px) {
          .uc-iframe {
            height: 500px !important;
          }
        }
      `}</style>
      <iframe
        id="EmbedReviews-Collect-Form"
        className="uc-iframe"
        src="https://embedsocial.com/api/pro_universal_collect_form/7830983d4e58b13503a24afec9acce0b96121f12"
        frameBorder="0"
        border="0"
        style={{ width: '100%', height: '100%' }}
        title="Customer Reviews"
      />
    </div>
  );
};

export default Reviews;

