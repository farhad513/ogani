import React from "react";

const ChangePassword = () => {
  return (
    <div className="p-4 bg-white">
      <h2 className="text-xl text-slate-600 py-5 text-center">
        Change Password
      </h2>
      <form>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="old_password">Old Password</label>
          <input
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
            type="password"
            id="old_password"
            name="old_password"
            placeholder="Old Password"
          />
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="new_password">New Password</label>
          <input
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
            type="password"
            id="new_password"
            name="new_password"
            placeholder="New Password"
          />
        </div>
        <button className="px-8 py-2 mt-3 bg-indigo-500 shadow-md hover:shadow-indigo-500/50 text-white rounded-e-md">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
