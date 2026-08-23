{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/master";
    flake-utils.url = "github:numtide/flake-utils";
    deploy-rs.url = "github:serokell/deploy-rs";
    deploy-rs.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      deploy-rs,
    }:
    flake-utils.lib.eachSystem
      [
        "aarch64-darwin"
        "aarch64-linux"
        "x86_64-linux"
      ]
      (
        system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        {
          packages.default = pkgs.buildNpmPackage {
            pname = "zackcreach";
            version = "0.1.0";
            src = ./.;
            npmDepsHash = "sha256-WpjYpS1sDOqQyjZcyJkNCYsuJkVNGdNgE+5PTsAApOI=";

            installPhase = ''
              runHook preInstall
              mkdir -p $out/share/zackcreach
              cp -R dist $out/share/zackcreach/site
              mkdir -p $out/share/prominent-tools
              printf '%s\n' '${
                self.rev or self.dirtyRev or "0000000000000000000000000000000000000000"
              }' > $out/share/prominent-tools/revision
              runHook postInstall
            '';
          };

          packages.deploy-rs = deploy-rs.packages.${system}.default;

          devShells.default = pkgs.mkShell {
            packages = [ pkgs.nodejs_24 ];
          };
        }
      )
    // {
      deploy.nodes.symphony = {
        hostname = "127.0.0.1";
        sshUser = "prominent-deploy";
        sshOpts = [
          "-o"
          "StrictHostKeyChecking=accept-new"
          "-o"
          "IdentitiesOnly=yes"
          "-i"
          "/var/lib/prominent-deploy/.ssh/prominent-deploy"
        ];
        remoteBuild = false;
        profiles.zackcreach = {
          user = "prominent-deploy";
          profilePath = "/nix/var/nix/profiles/per-user/prominent-deploy/zackcreach";
          path = deploy-rs.lib.x86_64-linux.activate.custom self.packages.x86_64-linux.default "sudo /run/current-system/sw/bin/prominent-tools-activate zackcreach";
        };
      };

      checks.x86_64-linux = deploy-rs.lib.x86_64-linux.deployChecks self.deploy;
    };
}
