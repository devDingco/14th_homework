import { hotSectionMock } from "./mock";
import Image from "next/image";
import "./hot-section.css";

export default function HotSection() {
    return (
        <div className="container hot_section">
            <div className="b_28_36">오늘 핫한 트립토크</div>
            <div className="hot_section_content">
                {hotSectionMock.map((item) => (
                    <div key={item.id} className="hot_section_item">
                            <Image src={item.image} alt={item.title} width={112} height={152} />
                            <div className="hot_section_item_content">
                                <div className="hot_section_item_content_title">
                                    <div className="b_16_24">{item.title}</div>
                                    <div className="hot_section_item_profile">
                                        <Image src={item.profileImage} alt={item.writer} width={24} height={24} />
                                        <div className="hot_section_item_profile_name l_14_20">{item.writer}</div>
                                    </div>
                                </div>
                                <div className="hot_section_item_content_footer">
                                    <div className="hot_section_item_content_footer_like">
                                        <Image src={"/icons/like_icon.png"} alt="like" width={24} height={24} />
                                        <span className="hot_menu_like r_14_20">{item.like}</span>
                                    </div>
                                    <div className="hot_menu_date l_12_20">{item.createdAt}</div>
                                </div>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    );
}