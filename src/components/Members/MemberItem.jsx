import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useHistory } from "react-router-dom";

function MemberItem(props) {
    const history = useHistory();
    
  const phoneFormat = (phoneString) => {
    if (phoneString) {
      const newPhoneFormat = phoneString.replace(
        /(\d{3})(\d{3})(\d{4})/,
        "($1)-$2-$3"
      );
      return newPhoneFormat;
    } else {
      return "";
    }
  };

  const handleCardClick = (memberId) => {
    history.push(`/members/${memberId}`)
  }

  return (
    <div className="border border-teal-700 rounded-md m-4 w-60 flex flex-col shadow-lg" onClick={()=>handleCardClick(props.user.id)}>
      <UserCircleIcon className="size-32 w-full h-60 bg-teal-600 self-center rounded-t-md" />
      <div className="p-4">
        <p className="font-bold py-2 text-lg text-start">
          {props.user.first_name} {props.user.last_name}
        </p>
        <p>
          {props.user.voice_section} {props.user.part}
        </p>
        <div className="pt-2">
          <p className="text-sm">{phoneFormat(props.user.phone)}</p>
          <p className="text-xs">{props.user.email}</p>
        </div>
      </div>
    </div>
  );
}
export default MemberItem;
