import { CancellationPolicyContent } from "../Data/CancellationRefundData/CancellationRefundContent";

const CancellationRefundPolicy = () => {
  const { title, points } = CancellationPolicyContent;

  return (
    <section className="pt-40 pb-20 bg-[url('/src/assets/Background/snow2.png')]">
      <div className="max-w-285 mx-auto px-6">
        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-8">
          {title}
        </h1>

        {/* POLICY POINTS */}
        <ul className="list-disc pl-5 gap-y-1.5 text-black leading-relaxed">
          {points.map((point, index) => (
            <li key={index}>
              {point.text}

              {/* SUB POINTS */}
              {point.subPoints && (
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  {point.subPoints.map((sub, subIndex) => (
                    <li key={subIndex}>
                      {sub}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CancellationRefundPolicy;
