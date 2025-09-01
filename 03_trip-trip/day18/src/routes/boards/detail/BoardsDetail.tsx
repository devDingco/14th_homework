// import { IconButton } from '../../../components'
import { IconButton } from 'components'
import './BoardsDetail.css'
import {
  LinkIcon,
  ProfileIcon,
  LocationIcon,
  BadIcon,
  GoodIcon,
  ListIcon,
  EditIcon,
} from 'assets/icons'
import { posts } from 'mocks/posts.mock'
import { Link, useParams } from 'react-router'

const BoardsDetail = () => {
  const { id = '1' } = useParams()
  const post = posts.find((p) => +p.id === +id)

  if (!id) {
    return (
      <div>
        잘못된 접근입니다. <Link to="/">홈으로</Link>
      </div>
    )
  }

  if (!post) {
    return (
      <div>
        게시글을 찾을 수 없어요. <Link to="/">홈으로</Link>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="detail-post">
        {/* details title */}
        <header>
          <h1 className="detail-post-title">{post.title}</h1>
        </header>

        {/* details option */}
        <div className="detail-post-details">
          <div className="detail-post-info">
            <div className="detail-post-profile">
              <ProfileIcon />
              <p>{post.writer}</p>
            </div>
            <p>{post.date}</p>
          </div>
          <hr />
          <div className="detail-post-func">
            <LinkIcon />
            <LocationIcon />
          </div>
        </div>

        {/* images */}
        <img src={post.images[0]} className="detail-post-image" />

        {/* contents */}
        <div className="detail-post-contents">{post.contents}</div>

        {/* youtube link */}
        <div className="detail-post-youtube">
          <iframe src={post.youtubeLink}></iframe>
        </div>

        {/* dis-like button */}
        <div className="detail-post-likes">
          <div className="detail-post-like">
            <BadIcon />
            <p>{post.dislikes}</p>
          </div>
          <div className="detail-post-like">
            <GoodIcon />
            <p>{post.likes}</p>
          </div>
        </div>

        {/* active button */}
        <div className="detail-post-active">
          <IconButton content="목록으로">
            <ListIcon />
          </IconButton>
          <IconButton content="수정하기">
            <EditIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default BoardsDetail
