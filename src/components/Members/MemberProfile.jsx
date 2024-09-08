import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { UserCircleIcon, PencilSquareIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

function MemberProfile() {
  const dispatch = useDispatch();
  const params = useParams();
  const memberId = params.id;
  const history = useHistory();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({
      type: "FETCH_MEMBER",
      payload: memberId,
    });
  }, []);
  const memberProfile = useSelector((store) => store.members.memberProfile);

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

  const hidePronouns = () => {
    if (memberProfile.member_id === user.id) {
      return (
        <div className="pr-4">
          <p className="font-bold">Pronouns:</p>
          {memberProfile.hide_pronouns && <p className="text-slate-500">&#40;Hidden from Directory&#41;</p>}
          <p>{memberProfile.pronouns}</p>
        </div>
      );
    } else if (memberProfile.hide_pronouns) {
      return;
    } else {
      return (
        <div className="pr-4">
        <p className="font-bold">Pronouns:</p>
        <p>{memberProfile.pronouns}</p>
      </div>
      );
    }
  };

  const hideMiddle = () => {
    if (memberProfile.member_id === user.id) {
      return (
        <div>
          <p className="font-bold">Middle Initial:</p>
          {memberProfile.hide_pronouns && <p className="text-slate-500">&#40;Hidden from Directory&#41;</p>}
          <p>{memberProfile.middle_initial}&#46;</p>
        </div>
      );
    } else if (memberProfile.hide_middle_initial) {
      return;
    } else {
      return (
        <div>
          <p className="font-bold">Middle Initial:</p>
          <p>{memberProfile.middle_initial}</p>
        </div>
      );
    }
  };

  const hidePhone = () => {
    if (memberProfile.member_id === user.id) {
      return (
        <div>
          {memberProfile.hide_phone && <p className="text-slate-500">&#40;Hidden from Directory&#41;</p>}
          <p>{phoneFormat(memberProfile.phone)}</p>
        </div>
      );
    } else if (memberProfile.hide_phone) {
      return;
    } else {
      return (
        <div>
          <p>{phoneFormat(memberProfile.phone)}</p>
        </div>
      );
    }
  };

  const hideEmail = () => {
    if (memberProfile.member_id === user.id) {
      return (
        <div className="py-1">
          {memberProfile.hide_email && <p className="text-slate-500">&#40;Hidden from Directory&#41;</p>}
          <p>{phoneFormat(memberProfile.email)}</p>
        </div>
      );
    } else if (memberProfile.hide_email) {
      return;
    } else {
      return (
        <div className="py-1">
          <p>{phoneFormat(memberProfile.email)}</p>
        </div>
      );
    }
  };

  const hideAddress = () => {
    if (memberProfile.member_id === user.id) {
      return (
        <div>
          {memberProfile.hide_address && <p className="text-slate-500">&#40;Hidden from Directory&#41;</p>}
          <p>
            {memberProfile.street_address_1} {memberProfile.street_address_2}
          </p>
          <p>
            {memberProfile.city}, {memberProfile.state} {memberProfile.zip}
          </p>
        </div>
      );
    } else if (memberProfile.hide_address) {
      return;
    } else {
      return (
        <div>
          <p>
            {memberProfile.street_address_1} {memberProfile.street_address_2}
          </p>
          <p>
            {memberProfile.city}, {memberProfile.state} {memberProfile.zip}
          </p>
        </div>
      );
    }
  };

const showEdit = () => {
    if (memberProfile.member_id === user.id) {
        return (
            <div className="flex flex-row" onClick={() => history.push('/edit-profile')}>
                <PencilSquareIcon className="size-4" />
                <p>Edit Profile</p>
            </div>
        )
    }
}

const handleClick = () => {
    history.push('/members')
}

  return (
    <div className="flex flex-col items-center p-6">
        <button className="flex flex-row items-center p-2 w-48 text-center rounded-full justify-center bg-teal-700 text-white shadow-md" onClick={()=> {handleClick()}} ><ArrowUturnLeftIcon className="size-6 pr-2" /> Back to Directory</button>
      <div className="flex flex-col items-center px-6 py-6 text-sm">
        <div className=" flex flex-row items-start border-1 border-slate-600 rounded-lg shadow-md bg-white px-6 py-4">
          <div className="flex flex-col w-72 text-xs">
            <UserCircleIcon className="size-52 self-center" />
            <div className="py-2">
              <p className="font-bold">About:</p>
              <p>{memberProfile.about}</p>
            </div>
            <div className="py-2">
              <p className="font-bold">Fun Fact:</p>
              <p>{memberProfile.fun_fact}</p>
            </div>
            <div className="py-2">
              <p className="font-bold">Employer:</p>
              <p>{memberProfile.employer}</p>
            </div>
            <div className="py-2">
                <p className="font-bold">Occupation:</p>
            </div>
            {memberProfile.member_id === user.id && (
              <div>
                <p>Sheet Music Preference:</p>
                <p>{memberProfile.sheet_music}</p>
              </div>
            )}
            {memberProfile.member_id === user.id && (
              <div>
                <p>Accessibility Accomodations:</p>
                <p>{memberProfile.accessibility}</p>
              </div>
            )}
          </div>
          <div className="text-xs">
            <div>
              <p className="text-3xl font-bold py-2">
                {memberProfile.first_name} {memberProfile.last_name}
              </p>
            </div>
            <div className="flex flex-row py-2">
              {hidePronouns()}
              {hideMiddle()}
            </div>
            <div className="py-2">
              <p className="font-bold">Primary Contact Information:</p>
              {hidePhone()}
              {hideEmail()}
              {hideAddress()}
            </div>
            <div className="py-2">
                <p className="font-bold">Emergency Contact Information:</p>
                <p>{memberProfile.emergency_name} &#40;{memberProfile.emergency_relation}&#41;</p>
                <p>{phoneFormat(memberProfile.emergency_phone)}</p>
            </div>
            {memberProfile.member_id === user.id && (
              <div className="py-2">
                <p className="font-bold">T-shirt Size:</p>
                <p className="text-slate-500">&#40;Hidden from Directory&#41;</p>
                <p>{memberProfile.shirt_size}</p>
              </div>
            )}
            <div className="py-2">
                <p className="font-bold">Height:</p>
                <p>{memberProfile.height_ft} ft. {memberProfile.height_in} in.</p>
            </div>
            <div className="py-2">
                <p className="font-bold">Status:</p>
                <p>{memberProfile.status}</p>
            </div>
            <div className="py-2">
                <p className="font-bold">Section:</p>
                <p>{memberProfile.voice_section} &#40;{memberProfile.part}&#41;</p>
            </div>
          </div>
          {showEdit()}
        </div>
      </div>
    </div>
  );
}

export default MemberProfile;
