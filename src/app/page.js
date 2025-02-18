import XTerminal from "@/components/Terminal";

export default function Home() {
  
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full h-full max-w-full max-h-[100vh] border border-[5px] border-black rounded-md  bg-white overflow-hidden p-4">
        <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-white">
          <div className="text-black">
            <pre className="text-black leading-none">
              {`
                  ___ ___         .__  .__            __      __            .__       .___
                /   |   \\   ____ |  | |  |   ____   /  \\    /  \\___________|  |    __| _/
              /    ~    \\_/ __ \\|  | |  |  /  _ \\  \\   \\/\\/   /  _ \\_  __ \\  |   / __ | 
              \\    Y    /\\  ___/|  |_|  |_(  <_> )  \\        (  <_> )  | \\/  |__/ /_/ | 
                \\___|_  /  \\___  >____/____/\\____/    \\__/\\  / \\____/|__|  |____/\\____ | 
                      \\/       \\/                          \\/                         \\/ 
              `}
            </pre>
          </div>
            <XTerminal />
          </div>
      </div>
    </div>
  );
}


