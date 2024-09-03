import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function SocialInfo() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [website_url, setWebsiteUrl] = useState("");
  const [x_url, setXUrl] = useState("");
  const [facebook_url, setFacebookUrl] = useState("");
  const [linkedin_url, setLinkedinUrl] = useState("");
  const [tiktok_url, setTiktokUrl] = useState("");
  const [instagram_url, setInstagramUrl] = useState("");

  const submitEmergency = (button) => {
    let socialToAdd = {
      website_url: website_url,
      x_url: x_url,
      facebook_url: facebook_url,
      linkedin_url: linkedin_url,
      tiktok_url: tiktok_url,
      instagram_url: instagram_url,
    };

    dispatch({ type: "SUBMIT_SOCIAL", payload: socialToAdd });

    if (button === "backToChecklist") {
      history.push("/");
    } else if (button === "nextSection") {
      history.push("/social-info");
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-2 text-sm">
      <div className=" flex flex-col items-center border-1 border-slate-600 rounded-lg shadow-md bg-white">
        <h2 className="text-lg font-bold">About Me</h2>
        <form>
          <div className="flex flex-col px-4 py-2">
            <label>Personal Website URL:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={website_url}
              onChange={(e) => setWebsiteUrl(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>LinkedIn URL:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={linkedin_url}
              onChange={(e) => setLinkedinUrl(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>Facebook URL:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={facebook_url}
              onChange={(e) => setFacebookUrl(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>Instagram URL:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={instagram_url}
              onChange={(e) => setInstagramUrl(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>X URL:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={x_url}
              onChange={(e) => setXUrl(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>TikTok URL:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={tiktok_url}
              onChange={(e) => setTiktokUrl(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-row px-4 py-2">
            <button
              className="border border-slate-600 rounded-full px-6 m-4 text-xs"
              onClick={() => history.push("/checklist")}
            >
              Cancel
            </button>
            <button
              className="border border-slate-600 rounded-full px-6 m-4 text-xs"
              onClick={() => submitEmergency("backToChecklist")}
            >
              Save and Back To Checklist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SocialInfo;