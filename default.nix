{ stdenv, pandoc }:

stdenv.mkDerivation 
{ name = "teamgit";
  buildInputs = [ pandoc ];
  src = ./.;

  installPhase = ''
    mkdir -p $out
    mv ./*.html $out/
  '';
}
