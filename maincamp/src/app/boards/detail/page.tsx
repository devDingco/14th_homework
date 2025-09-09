import Sectiontitle from "@/components/ui/section/Sectiontitle"; 
import Sectioncontent from "@/components/ui/section/Sectioncontent";
import Writer from "@/components/features/boards/boards-detail/Writer";
import Like from "@/components/features/boards/boards-detail/Like";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import styles from './styles.module.css'


export default function BoardsDetailPage () {
    return(
        <div className={styles.boardsDetail}>
            <Sectiontitle text="살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라" />
            <Writer writer="홍길동" date="2024.11.11"/>
            <img src="/images/boardsdetail_image.png" className={styles.addimage1}/>
            <Sectioncontent content={`살겠노라 살겠노라. 청산에 살겠노라.
머루랑 다래를 먹고 청산에 살겠노라.
얄리얄리 얄랑셩 얄라리 얄라

우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
너보다 시름 많은 나도 자고 일어나 우노라.
얄리얄리 얄라셩 얄라리 얄라

갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.
얄리얄리 얄라셩 얄라리 얄라

이럭저럭 하여 낮일랑 지내 왔건만
올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.
얄리얄리 얄라셩 얄라리 얄라

어디다 던지는 돌인가 누구를 맞히려던 돌인가.
미워할 이도 사랑할 이도 없이 맞아서 우노라.
얄리얄리 얄라셩 얄라리 얄라

살겠노라 살겠노라. 바다에 살겠노라.
나문재, 굴, 조개를 먹고 바다에 살겠노라.
얄리얄리 얄라셩 얄라리 얄라

가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.
사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.
얄리얄리 얄라셩 얄라리 얄라

가다 보니 배불룩한 술독에 독한 술을 빚는구나.
조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
얄리얄리 얄라셩 얄라리 얄라`}/>
            <div className={styles.boardsDetail__youtube__group}>
                <img src="/icons/play.svg" className={styles.youtube__icon}/>
                {/* <img src="/images/boardsdetail_image_2.png" className={styles.youtube__thumbnail} /> */}
                <iframe 
                id="ytplayer" 
                type="text/html"
                src="https://www.youtube.com/embed/9kzE8isXlQY"
                frameborder="0" allowfullscreen 
                className={styles.youtube__thumbnail}></iframe>
            </div>
            <Like bad={24} good={12}/>
            <div className={styles.boardsDetail__button__group}>
                <Link href='/'>
                    <Button type="button" variant='FormBtn'><img src="/icons/menu.svg"/>목록으로</Button>
                </Link>
                <Button type="button" variant='FormBtn'><img src="/icons/edit.svg"/>수정하기</Button>
            </div>
        </div>
    );
}