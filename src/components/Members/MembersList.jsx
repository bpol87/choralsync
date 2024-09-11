// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/24/outline";


// Imported Components
import MemberItem from "./MemberItem";

function MemberList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_MEMBER_CARDS" });
  }, []);
  
  const history = useHistory();
  const users = useSelector((store) => store.members.membersCards);
  const [searchText, setSearchText] = useState('')
 
    const filteredUsers = users && users.filter(
        ({ first_name, last_name, voice_section, part }) =>
          first_name.toLowerCase().includes(searchText.toLowerCase()) ||
          last_name.toLowerCase().includes(searchText.toLowerCase()) || 
          voice_section.toLowerCase().includes(searchText.toLowerCase()) ||
            part.toLowerCase().includes(searchText.toLowerCase())
      );

  return (
    <div className="p-4 flex flex-col items-center">
        <h2 className="pb-4 font-bold text-3xl">Member Directory</h2>
        <div className="flex flex-row items-center">
            <input type="text" className="rounded-l-md p-2" onChange={e=>setSearchText(e.target.value)} placeholder="Search Directory"></input>
            <MagnifyingGlassIcon className="size-10 bg-white p-1 rounded-r-md text-slate-400" />
        </div>
        {/* <div className="flex flex-row p-4 items-center">
            <button className="bg-white w-32 rounded-l-md p-2 border flex flex-row items-center text-center"><FunnelIcon className="size-6 text-black" /> Filter</button>
            <button className="bg-white w-32 rounded-r-md p-2 border flex flex-row items-center text-center">Sort<AdjustmentsHorizontalIcon className="size-6" /></button>
        </div> */}
      <div className="flex items-center">
        <div className="flex flex-wrap justify-center">›
          {filteredUsers &&
            filteredUsers.map((user) => {
              return <MemberItem key={user.id} user={user} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default MemberList;
