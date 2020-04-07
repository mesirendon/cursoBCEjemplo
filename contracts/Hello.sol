pragma solidity >= 0.5.0 < 0.7.0;

contract Hello {
  address public owner;
  string public text;

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "You are not the owner");
    _;
  }

  function write(string memory _text) public onlyOwner {
    text = _text;
  }
}
