import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Checkbox, Tooltip, Typography } from "@material-tailwind/react";

export default function Completed() {
  return (
    <>
      <div className="mt-5">
        <h1 className="text-4xl font-bold">Completed</h1>
        <p className="text-lg text-dark">
          List of task that completed. Great work
        </p>
      </div>
      <div className="grid grid-cols-1 gap-1 mt-10">

        <div className="flex items-center justify-between mb-1">
          <div className="bg-white px-5 py-0 w-full rounded-md shadow-md">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox checked className="peer" />
                <Typography>
                  <span className="line-through">Hey</span>
                </Typography>
              </div>

              <div className="flex justify-end items-center gap-2">
                <Tooltip content="Redo">
                    <ArrowPathIcon className="h-5 w-5 text-grey-500 cursor-pointer" />
                </Tooltip>
                {/* <Tooltip content="Delete">
                    <TrashIcon className="h-5 w-5 text-red-500 cursor-pointer" />
                </Tooltip> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
