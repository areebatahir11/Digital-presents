// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GiftChain is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private tokenIdCounter;

    struct Gifting {
        string emojiKeyword;
        string message;
        address sender;
    }

    mapping(uint256 => Gifting) private tokenIdToGift;

    constructor() ERC721("GiftChain", "GIFT") {}

    function mintGift(
        address recipient,
        string memory _emojiKeyword,
        string memory _message
    ) public {
        uint256 newTokenId = tokenIdCounter.current();
        _safeMint(recipient, newTokenId);

        tokenIdToGift[newTokenId] = Gifting({
            emojiKeyword: _emojiKeyword,
            message: _message,
            sender: msg.sender
        });

        tokenIdCounter.increment();
    }

    function viewGift(
        uint256 tokenId
    ) public view returns (string memory, string memory, address) {
        require(ownerOf(tokenId) != address(0), "Gift does not exist");
        Gifting memory gift = tokenIdToGift[tokenId];
        return (gift.emojiKeyword, gift.message, gift.sender);
    }
    function getLatestTokenId() public view returns (uint256) {
        return tokenIdCounter.current();
    }
}
