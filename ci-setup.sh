curl -o meteor_install_script.sh https://install.meteor.com/
chmod +x meteor_install_script.sh
sed -i "s/type sudo >\/dev\/null 2>&1/\ false /g" meteor_install_script.sh
./meteor_install_script.sh
export PATH=$PATH:~/.meteor/
meteor --version
# NPM Package Installs
npm install -g mgp
npm install -g spacejam
# Pull in private Meteor Packages either from Git or local
mgp
