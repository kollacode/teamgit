{ pkgs ? import <nixpkgs> {}}:

with pkgs;

callPackage ./default.nix {}
