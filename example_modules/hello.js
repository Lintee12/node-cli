//to make a command you must use this format

//to install it use `install <PathToFile>`

//if a command already has the same name it will run the one that was installed first

module.exports = {
  command: "hello", //name of command
  description: "Greets the user based on the provided name.", //description of command
  callback: (args) => {
    //can be async if needed
    //the code that is run when the command is called
    //args will be an array of strings example `echo hello world` args would be ["hello", "world"]
    //returning a string will output it to the console
    if (!args || !args.length > 0) {
      return console.warn("Usage: hello <yourName>");
    } else {
      return `Hello, ${args.join(" ")}!`; //better to return a string if its you final output so it can be piped
    }
  },
};
