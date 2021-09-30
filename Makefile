# SPDX-License-Identifier: AGPL-3.0-or-later

all:
	echo -n

include build.mk

install:
	mkdir -p $(DESTDIR)/etc/sudoers.d
	$(call mk_install_dir, conf/nginx/includes)
	$(call mk_install_dir, conf/nginx/templates)

	cp conf/sudoers.d/02_zimbra-proxy $(DESTDIR)/etc/sudoers.d
	cp conf/nginx/*                   $(INSTALL_DIR)/conf/nginx/templates

clean:
	echo -n
