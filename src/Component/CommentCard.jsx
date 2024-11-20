/* eslint-disable react/prop-types */
const CommentCard = ({comment}) => {

  return (
    <div className="mt-12">
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={comment.currentUserPhoto} ></img>
          </div>
        </div>
        <div className="chat-header mb-2">
          {comment.currentUserName}
        </div>
        <div className="chat-bubble bg-grn text-white">{comment.comment} </div>
      </div>
    </div>
  );
};

export default CommentCard;
