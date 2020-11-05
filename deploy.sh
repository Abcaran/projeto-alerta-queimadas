npm run-script build
ssh do_ubuntu rm -r /var/www/queimadas.rafaelherbert.com.br
scp -r build/* do_ubuntu:/var/www/queimadas.rafaelherbert.com.br