export default function Card({
    title,
    value,
    icon,
    change,
    changeType = "neutral", // "increase" | "decrease" | "neutral"
}) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-5 flex items-center justify-between hover:shadow-lg transition">

            {/* Left Content */}
            <div>
                <h3 className="text-sm text-gray-500">{title}</h3>

                <p className="text-2xl font-bold mt-1 text-gray-800">
                    {value}
                </p>

                {/* Optional Change Indicator */}
                {change && (
                    <p
                        className={`text-sm mt-1 ${changeType === "increase"
                                ? "text-green-500"
                                : changeType === "decrease"
                                    ? "text-red-500"
                                    : "text-gray-400"
                            }`}
                    >
                        {change}
                    </p>
                )}
            </div>

            {/* Right Icon */}
            {icon && (
                <div className="text-3xl text-orange-500">
                    {icon}
                </div>
            )}
        </div>
    );
}