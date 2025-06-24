type Props = {
    title: string;
    content: string;
};

export default function MainCard({ title, content }: Props) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 w-96 hover:shadow-xl transition-all hover:scale-105">
            <div className="mb-3">
                <p className="text-2xl font-bold text-[#2E4053]">{title}</p>
            </div>
            <div>
                <p className="text-base text-[#28B463]">{content}</p>
            </div>
        </div>
    );
}
